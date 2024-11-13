import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';

import { C_COUNTRIES_KEY } from './country.constants';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  private readonly logger: Logger;
  private readonly useDataFrom: 'cache-database' | 'cache-provider' = 'cache-database';

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

  async getCountries(): Promise<Country[]> {
    try {
      const countries = await this._getAllCountriesFromCache();

      if (!countries.length) {
        let fetchedCountries: Country[];

        if (this.useDataFrom === 'cache-provider') {
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

  async _getAllCountriesFromDb(): Promise<Country[]> {
    this.logger.log('Getting data from the database');

    return await this.countryRepository.find();
  }

  async _getAllCountriesFromCache(): Promise<Country[]> {
    this.logger.log('Getting data from the cache');
    const keys = await this.countryCache.keys(`${C_COUNTRIES_KEY}:*`);

    return await this.cacheService.getAllDataFromCache<Country[]>(this.countryCache, keys);
  }

  async _findOrCreate(country: Country): Promise<Country> {
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
