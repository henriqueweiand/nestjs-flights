import { Injectable } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';
import { AirportService } from '@components/airport/airport.service';
import { CountryService } from '@components/country/country.service';

@Injectable()
export class FlightsService {
  private readonly logger: Logger

  constructor(
    private readonly countryService: CountryService,
    private readonly airportService: AirportService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(FlightsService.name);
  }

  getCountries() {
    return this.countryService.getCountries()
  }

  getAirports() {
    return this.airportService.getAirports()
  }
}
