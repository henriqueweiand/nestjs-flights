import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

import { LoggerModule } from '@app/logger';
import { AirportModule } from '@components/airport';
import { CountryModule } from '@components/country';

@Module({
  imports: [
    LoggerModule,
    CountryModule,
    AirportModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
