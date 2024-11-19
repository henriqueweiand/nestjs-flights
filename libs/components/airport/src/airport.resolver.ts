import { Query, Resolver } from '@nestjs/graphql';

import { Airport } from './entities/airport.entity';
import { AirportService } from './airport.service';
import { Logger, LoggerService } from '@app/logger';

@Resolver(of => Airport)
export class AirportResolver {
  private readonly logger: Logger

  constructor(
    private readonly airportService: AirportService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(AirportResolver.name);
  }

  @Query(returns => [Airport])
  async airports(): Promise<Airport[]> {
    return await this.airportService.getAirports();
  }
}