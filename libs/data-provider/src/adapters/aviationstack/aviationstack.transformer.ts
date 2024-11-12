import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';

import { AviationStackCoutries } from './aviationstack.interface';
import { DataProviderEnum } from '@app/data-provider/enums/data-provider.enum';

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
      externalId: aviationstackCountry.id,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }
}
