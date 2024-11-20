import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Country } from '@components/country/entities/country.entity';

import { AirportCountryDataloader } from './aiport-country.dataloader';
import { Airport } from './entities/airport.entity';

@Resolver(() => Airport)
export class AiportFieldsResolver {
  constructor(
    private readonly airportCountryDataloader: AirportCountryDataloader
  ) { }

  @ResolveField('country', () => Country)
  country(@Parent() airport: Airport) {
    if (!airport.countryId) {
      return null;
    }

    return this.airportCountryDataloader.load(airport.countryId);
  }
}
