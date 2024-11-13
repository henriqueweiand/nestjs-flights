import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';

import { C_COUNTRIES_KEY } from './country.constants';
import { Country } from './entities/country.entity';
import { CacheService } from '@app/cache';

@Injectable()
export class CountryService {
  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @Inject(CACHE.C_COUNTRY) private readonly countryCache: Redis,
    private readonly cacheService: CacheService
  ) { }

  async getCountries(): Promise<Country[]> {
    try {
      const countries = await this._getAllCountriesFromCache();

      if (!countries.length) {
        const fetchedCountries = await this.dataProviderAdapter.getCountries();

        await Promise.all(
          fetchedCountries.map(async (country) => await this._findOrCreate(country))
        );
        return fetchedCountries;
      }

      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  }

  async _getAllCountriesFromCache(): Promise<Country[]> {
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
