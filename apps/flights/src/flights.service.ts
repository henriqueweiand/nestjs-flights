import { CountryService } from '@components/country/country.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  constructor(
    private readonly countryService: CountryService
  ) { }

  getHello() {
    return this.countryService.getCountries()
  }
}
