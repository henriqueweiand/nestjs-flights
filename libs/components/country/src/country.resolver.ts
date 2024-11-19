import { Query, Resolver } from '@nestjs/graphql';

import { Country } from './entities/country.entity';
import { CountryService } from './country.service';
import { Logger, LoggerService } from '@app/logger';

@Resolver(of => Country)
export class CountryResolver {
  private readonly logger: Logger

  constructor(
    private readonly countryService: CountryService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(CountryResolver.name);
  }

  @Query(returns => [Country])
  async countries(): Promise<Country[]> {
    return await this.countryService.getCountries();
  }
}