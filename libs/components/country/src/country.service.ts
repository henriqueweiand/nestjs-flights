import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { In, Repository } from 'typeorm';

import { CacheService, CacheStrategy } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';

import { C_COUNTRIES_KEY } from './country.constants';
import { Country } from './entities/country.entity';
import { Airport } from '@components/airport/entities/airport.entity';

@Injectable()
export class CountryService {
  private readonly logger: Logger;

  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @Inject(CACHE.C_COUNTRY) private readonly countryCache: Redis,
    private readonly cacheService: CacheService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(CountryService.name);
  }

  async getAirportsByCountryIds(countryIds: string[]): Promise<Airport[] | null> {
    const countries = await this.countryRepository.find({
      where: {
        id: In(countryIds)
      },
      relations: ['airports'],
    });

    const airports = countries.flatMap(country => country.airports);
    return airports.length ? airports : null;
  }

  async getCountries(dataStrategy: CacheStrategy = CacheStrategy.CACHE_DATABASE): Promise<Country[]> {
    try {
      const countries = await this._getAllCountriesFromCache();

      if (!countries.length) {
        let fetchedCountries: Country[];

        if (dataStrategy === CacheStrategy.CACHE_PROVIDER) {
          fetchedCountries = await this.dataProviderAdapter.getCountries(true);
        } else {
          fetchedCountries = await this._getAllCountriesFromDb();
        }

        await Promise.all(
          fetchedCountries.map(async (country) => await this._findOrCreate(country))
        );
        return fetchedCountries;
      }
      this.logger.log('Using the data from the cache');

      return countries;
    } catch (error) {
      this.logger.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  }

  /**
   * Get a country by id - look for the countries in the cache otherwise look for it in the database
   * @param countryIds - The id of the countries
   */
  async getCountriesByIds(countryIds: string[]): Promise<Country[] | null> {
    this.logger.log(`Looking for countries with ids: ${countryIds}`);

    let countries: Country[] = [];
    let countriesInCache = await this._getAllCountriesFromCache();

    // Filter countries that are in the cache
    let cachedCountries = countriesInCache.filter(
      (c) => countryIds.includes(c.id)
    );

    // Get the IDs of the countries that are not in the cache
    let cachedCountryIds = cachedCountries.map(c => c.id);
    let missingCountryIds = countryIds.filter(id => !cachedCountryIds.includes(id));

    if (missingCountryIds.length) {
      this.logger.log('Some countries not found in the cache, looking in the database');

      let countriesFromDb = await this.countryRepository.find({
        where: { id: In(missingCountryIds) }
      });

      // Update the cache with the newly fetched countries
      countriesFromDb.map(async (country) => {
        const cacheKey = `${C_COUNTRIES_KEY}:${country.id}`;
        await this.cacheService.setCache(this.countryCache, cacheKey, country);
      });

      // Combine the results from the cache and the database
      countries = [...cachedCountries, ...countriesFromDb];
    } else {
      countries = cachedCountries;
    }

    return countries;
  }

  /**
   * Get a country by name - look for the country in the cache otherwise look for it in the database
   * @param countryName - The name of the country
   */
  async getOneByName(countryName: string): Promise<Country | null> {
    this.logger.log(`Looking for country with name: ${countryName}`);

    let country: Country | null = null;
    let countriesInCache = await this._getAllCountriesFromCache();

    country = countriesInCache.find(
      (c) => c.countryName === countryName
    );

    if (!country) {
      this.logger.log('Not found in the cache, looking in the database');

      country = await this.countryRepository.findOne({
        where: { countryName }
      });

      const cacheKey = `${C_COUNTRIES_KEY}:${country.id}`;
      await this.cacheService.setCache(this.countryCache, cacheKey, country);
    }

    return country;
  }

  /**
   * Get all countries from the database
   */
  private async _getAllCountriesFromDb(): Promise<Country[]> {
    this.logger.log('Getting data from the database');

    return await this.countryRepository.find();
  }

  /**
   * Get All countries from the cache
   */
  private async _getAllCountriesFromCache(): Promise<Country[]> {
    this.logger.log('Getting data from the cache');
    const keys = await this.countryCache.keys(`${C_COUNTRIES_KEY}:*`);

    return await this.cacheService.getAllDataFromCache<Country[]>(this.countryCache, keys);
  }

  private async _findOrCreate(country: Country): Promise<Country> {
    let cacheKey = `${C_COUNTRIES_KEY}:${country.id}`;

    // Check if the data is in the cache
    const cachedCountry = await this.cacheService.getCache<Country>(this.countryCache, cacheKey);
    if (cachedCountry) {
      return cachedCountry;
    }

    if (!country?.id) {
      // Check if the data is in the database
      let countryFromDb = await this.countryRepository.findOne({
        where: {
          countryName: country.countryName,
          continent: country.continent
        }
      });

      if (!countryFromDb) {
        countryFromDb = await this.countryRepository.save(country);
      }

      cacheKey = `${C_COUNTRIES_KEY}:${countryFromDb.id}`;
      await this.cacheService.setCache(this.countryCache, cacheKey, countryFromDb);

      return countryFromDb;
    } else {
      await this.cacheService.setCache(this.countryCache, cacheKey, country);
    }

    return country;
  }
}
