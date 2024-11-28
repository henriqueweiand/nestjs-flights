import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';
import { JwtGuard } from '@app/auth/jwt/jwt.guard';

import { Airport } from './entities/airport.entity';
import { AirportService } from './airport.service';

@Resolver(of => Airport)
export class AirportResolver {
  private readonly logger: Logger

  constructor(
    private readonly airportService: AirportService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(AirportResolver.name);
  }

  @UseGuards(JwtGuard)
  @Query(returns => [Airport])
  async airports(): Promise<Airport[]> {
    return await this.airportService.getAirports();
  }
}