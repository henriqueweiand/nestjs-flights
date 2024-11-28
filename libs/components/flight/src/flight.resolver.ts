import { Query, Resolver } from '@nestjs/graphql';

import { JwtGuard } from '@app/auth/jwt/jwt.guard';
import { Logger, LoggerService } from '@app/logger';
import { UseGuards } from '@nestjs/common';

import { Flight } from './entities/flight.entity';
import { FlightService } from './flight.service';

@Resolver(of => Flight)
export class FlightResolver {
  private readonly logger: Logger

  constructor(
    private readonly flightService: FlightService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(FlightResolver.name);
  }

  @UseGuards(JwtGuard)
  @Query(returns => [Flight])
  async flights(): Promise<Flight[]> {
    return await this.flightService.getFlights();
  }
}