import { Query, Resolver } from '@nestjs/graphql';

import { Flight } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { Logger, LoggerService } from '@app/logger';

@Resolver(of => Flight)
export class FlightResolver {
  private readonly logger: Logger

  constructor(
    private readonly flightService: FlightService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(FlightResolver.name);
  }

  @Query(returns => [Flight])
  async flights(): Promise<Flight[]> {
    return await this.flightService.getFlights();
  }
}