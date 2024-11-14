import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

import { DataProviderEnricherService } from '@app/data-provider/enricher/data-provider-enricher.service';
import { Airport } from '@components/airport/entities/airport.entity';
import { Country } from '@components/country/entities/country.entity';

import { AviationStackRequesterService } from './aviationstack-requester/aviationstack-requester.service';
import { AviationStackModuleTransformer } from './aviationstack.transformer';

@Injectable()
export class AviationStackModuleAdapter extends DataProviderAdapter {
  constructor(
    private readonly aviationStackRequesterService: AviationStackRequesterService,
    private readonly aviationStackModuleTransformer: AviationStackModuleTransformer,
    private readonly dataProviderEnricherService: DataProviderEnricherService,
  ) {
    super();
  }

  async getCountries(getAll = true): Promise<Country[]> {
    const countries = await this.aviationStackRequesterService.getCountries(getAll);

    return countries.map((country) => this.aviationStackModuleTransformer.transformCountries(country));
  }

  async getAirports(getAll = true): Promise<Airport[]> {
    const countries = await this.aviationStackRequesterService.getAirports(getAll);

    // call dataProviderEnricherService here to enrich airports with countries
    return countries.map((airport) => this.aviationStackModuleTransformer.transformAirports(airport));
  }
}
