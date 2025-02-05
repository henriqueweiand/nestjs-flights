import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { AviationStackModule, DataProviderModule } from '@app/data-provider';
import { LoggerModule } from '@app/logger';
import { AirportModule } from '@components/airport';

import { Arrival } from './entities/arrival.entity';
import { Departure } from './entities/departure.entity';
import { Flight } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { FlightResolver } from './flight.resolver';

@Module({
  imports: [
    LoggerModule,
    AirportModule,
    DataProviderModule.withAdapter(AviationStackModule.register()),
    TypeOrmModule.forFeature([Flight, Departure, Arrival]),
    CacheModule.register([CACHE.C_FLIGHT]),
  ],
  providers: [FlightService, FlightResolver],
  exports: [FlightService],
})
export class FlightModule { }
