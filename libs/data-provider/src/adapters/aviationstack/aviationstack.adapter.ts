import { Injectable } from '@nestjs/common';

import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Airport } from '@components/airport/entities/airport.entity';
import { Country } from '@components/country/entities/country.entity';

import { AviationStackRequesterService } from './aviationstack-requester/aviationstack-requester.service';
import { AviationStackModuleTransformer } from './aviationstack.transformer';

@Injectable()
export class AviationStackModuleAdapter extends DataProviderAdapter {
  constructor(
    private readonly aviationStackRequesterService: AviationStackRequesterService,
    private readonly aviationStackModuleTransformer: AviationStackModuleTransformer,
  ) {
    super();
  }

  async getCountries(getAll = true): Promise<Country[]> {
    const countries = await this.aviationStackRequesterService.getCountries(getAll);

    return countries.map((country) => this.aviationStackModuleTransformer.transformCountries(country));
  }

  async getAirports(getAll = true): Promise<Airport[]> {
    const airports = await this.aviationStackRequesterService.getAirports(getAll);

    return airports.map((airport) => this.aviationStackModuleTransformer.transformAirports(airport));
  }
}
