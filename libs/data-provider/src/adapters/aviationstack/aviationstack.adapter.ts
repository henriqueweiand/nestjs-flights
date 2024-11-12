import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

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

  async getCountries(): Promise<Country[]> {
    const countries = await this.aviationStackRequesterService.getCountries();

    return countries.map((country) => this.aviationStackModuleTransformer.transformCountries(country));
  }
}
