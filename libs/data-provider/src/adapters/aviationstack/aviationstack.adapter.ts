import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

import { AviationStackRequesterService } from './aviationstack-requester/aviationstack-requester.service';

@Injectable()
export class AviationStackModuleAdapter extends DataProviderAdapter {
  constructor(
    private readonly aviationStackRequesterService: AviationStackRequesterService,
  ) {
    super();
  }

  async getCoutries(): Promise<any> {
    const countries = await this.aviationStackRequesterService.getCountries();

    return countries;
  }
}
