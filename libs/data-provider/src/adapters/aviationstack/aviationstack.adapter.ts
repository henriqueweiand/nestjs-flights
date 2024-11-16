import { Injectable } from '@nestjs/common';

import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { FlightQueryParams } from '@app/data-provider/data-provider.interface';
import { Airport } from '@components/airport/entities/airport.entity';
import { Country } from '@components/country/entities/country.entity';
import { Flight } from '@components/flight/entities/flight.entity';

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

  async getFlights(getAll = true, params?: FlightQueryParams): Promise<Flight[]> {
    const flights = await this.aviationStackRequesterService.getFlights(getAll, params);

    return flights.map((flight) => this.aviationStackModuleTransformer.transformFlights(flight));
  }
}
