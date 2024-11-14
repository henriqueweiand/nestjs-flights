import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService, CacheStrategy } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';

import { C_COUNTRIES_KEY } from './country.constants';
import { Country } from './entities/country.entity';

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

  async getCountries(dataStrategy: CacheStrategy = CacheStrategy.CACHE_DATABASE): Promise<Country[]> {
    try {
      const countries = await this._getAllCountriesFromCache();

      if (!countries.length) {
        let fetchedCountries: Country[];

        if (dataStrategy === CacheStrategy.CACHE_PROVIDER) {
          fetchedCountries = await this.dataProviderAdapter.getCountries();
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
   * Get a country by name or iso2 - look for the country in the cache otherwise look for it in the database
   * @param countryName - The name of the country
   */
  async getCountryByName(countryName: string): Promise<Country | null> {
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
  }
}
