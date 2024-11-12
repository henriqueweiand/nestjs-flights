import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class DataProviderAdapter {
  abstract getCountries(): Promise<any>;
}
