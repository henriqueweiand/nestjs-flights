import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';

@Injectable()
export abstract class DataProviderAdapter {
  abstract getCountries(): Promise<Country[]>;
}
