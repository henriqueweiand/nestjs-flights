import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter
  ) { }

  getCoutries() {
    return this.dataProviderAdapter.getCoutries()
  }
}
