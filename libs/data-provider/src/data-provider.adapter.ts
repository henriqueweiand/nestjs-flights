import { Injectable } from '@nestjs/common';

import { Airport } from '@components/airport/entities/airport.entity';
import { Country } from '@components/country/entities/country.entity';
import { Flight } from '@components/flight/entities/flight.entity';

import { FlightQueryParams } from './data-provider.interface';

@Injectable()
export abstract class DataProviderAdapter {
  abstract getCountries(getAll?: boolean): Promise<Country[]>;
  abstract getAirports(getAll?: boolean): Promise<Airport[]>;
  abstract getFlights(getAll?: boolean, params?: FlightQueryParams): Promise<Flight[]>;
}
