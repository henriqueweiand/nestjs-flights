import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';

import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) { }

  async getCoutries() {
    return await this.dataProviderAdapter.getCoutries()
  }

  async getCoutry() {
    // is it in cache?
    // is it in db?
    // persist in db and cache

    return await this.dataProviderAdapter.getCoutries()
  }

  async insertBulkCountries(countries: Country[]): Promise<Country[]> {
    return await this.countryRepository.save(countries);
  }
}
