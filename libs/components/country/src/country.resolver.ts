import { Query, Resolver } from '@nestjs/graphql';

import { JwtGuard } from '@app/auth/jwt/jwt.guard';
import { Logger, LoggerService } from '@app/logger';
import { UseGuards } from '@nestjs/common';

import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

@Resolver(of => Country)
export class CountryResolver {
  private readonly logger: Logger

  constructor(
    private readonly countryService: CountryService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(CountryResolver.name);
  }

  @UseGuards(JwtGuard)
  @Query(returns => [Country])
  async countries(): Promise<Country[]> {
    return await this.countryService.getCountries();
  }
}