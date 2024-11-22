import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { Airport } from '@components/airport/entities/airport.entity';
import { CountryService } from './country.service';

@Injectable({ scope: Scope.REQUEST })
export class CountryAirportsDataloader extends DataLoader<string, Airport[]> {
  constructor(
    private readonly countryService: CountryService
  ) {
    super(async (keys: string[]) => this._batchLoad(keys));
  }

  private async _batchLoad(countryIds: string[]): Promise<Airport[][]> {
    const airports = await this.countryService.getAirportsByCountryIds(countryIds);
    const countryAirportMap = new Map<string, Airport[]>();

    airports.forEach(airport => {
      const countryId = airport.countryId;
      if (!countryAirportMap.has(countryId)) {
        countryAirportMap.set(countryId, []);
      }
      countryAirportMap.get(countryId).push(airport);
    });

    return countryIds.map(id => countryAirportMap.get(id) || []);
  }
}