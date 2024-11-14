import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';

import { AviationStackAirports, AviationStackCoutries } from './aviationstack.interface';
import { DataProviderEnum } from '@app/data-provider/enums/data-provider.enum';
import { Airport } from '@components/airport/entities/airport.entity';

@Injectable()
export class AviationStackModuleTransformer {
  transformCountries(aviationstackCountry: AviationStackCoutries): Country {
    return new Country({
      capital: aviationstackCountry.capital,
      continent: aviationstackCountry.continent,
      countryName: aviationstackCountry.country_name,
      currencyCode: aviationstackCountry.currency_code,
      currencyName: aviationstackCountry.currency_name,
      phonePrefix: aviationstackCountry.phone_prefix,
      countryIso2: aviationstackCountry.country_iso2,
      countryIso3: aviationstackCountry.country_iso3,
      externalId: aviationstackCountry.id,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }

  transformAirports(aviationstackCountry: AviationStackAirports): Airport {
    return new Airport({
      name: aviationstackCountry.airport_name,
      aitaCode: aviationstackCountry.iata_code,
      acaoCode: aviationstackCountry.icao_code,
      latitude: aviationstackCountry.latitude,
      longitude: aviationstackCountry.longitude,
      timezone: aviationstackCountry.timezone,
      gmt: aviationstackCountry.gmt,
      phoneNumber: aviationstackCountry.phone_number,
      countryName: aviationstackCountry.country_name,
      externalId: aviationstackCountry.id,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }
}
