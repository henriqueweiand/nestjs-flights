import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Country } from '@components/country/entities/country.entity';

import { CountryAirportsDataloader } from './country-aiports.dataloader';
import { Airport } from '@components/airport/entities/airport.entity';

@Resolver(() => Country)
export class CountryFieldsResolver {
  constructor(
    private readonly countryAirportsDataloader: CountryAirportsDataloader
  ) { }

  @ResolveField('airports', () => [Airport])
  airports(@Parent() country: Country) {
    return this.countryAirportsDataloader.load(country.id);
  }
}
