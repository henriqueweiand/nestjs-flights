import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { CountryService } from '@components/country/country.service';
import { Country } from '@components/country/entities/country.entity';

@Injectable({ scope: Scope.REQUEST })
export class AirportCountryDataloader extends DataLoader<string, Country | null> {
  constructor(
    private readonly countryService: CountryService
  ) {
    super(async (keys: string[]) => this._batchLoad(keys));
  }

  private async _batchLoad(countryIds: string[]): Promise<(Country | null)[]> {
    const countries = await this.countryService.getCountriesByIds(countryIds);
    const countryMap = new Map(countries.map(country => [country.id, country]));

    return countryIds.map(id => countryMap.get(id) || null);
  }
}