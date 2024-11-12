import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';

import { C_COUNTRIES_KEY } from './country.constants';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @Inject(CACHE.C_COUNTRY) private readonly countryCache: Redis,
    private readonly cacheService: CacheService
  ) { }

  // TODO: Implement pagination
  async getCoutries() {
    return this.cacheService.getFromCacheOrFetch(
      this.countryCache,
      C_COUNTRIES_KEY,
      () => this.dataProviderAdapter.getCountries()
    );
  }

  async getCoutry() {
    // is it in cache?
    // is it in db?
    // persist in db and cache

    return await this.dataProviderAdapter.getCountries()
  }

  async insertBulkCountries(countries: Country[]): Promise<Country[]> {
    return await this.countryRepository.save(countries);
  }
}
