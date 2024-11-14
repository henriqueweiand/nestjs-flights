import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';
import { Airport } from '@components/airport/entities/airport.entity';

@Injectable()
export abstract class DataProviderAdapter {
  abstract getCountries(getAll?: boolean): Promise<Country[]>;
  abstract getAirports(getAll?: boolean): Promise<Airport[]>;
}
