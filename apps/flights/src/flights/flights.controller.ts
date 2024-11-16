import { Controller, Get } from '@nestjs/common';

import { FlightsService } from './flights.service';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) { }

  @Get('countries')
  getCountries() {
    return this.flightsService.getCountries();
  }

  @Get('airports')
  getAirports() {
    return this.flightsService.getAirports();
  }

  @Get('flights')
  getFlights() {
    return this.flightsService.getFlights();
  }
}
