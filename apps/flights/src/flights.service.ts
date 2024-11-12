import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter
  ) { }

  getHello() {
    return this.dataProviderAdapter.getCoutries()
  }
}
