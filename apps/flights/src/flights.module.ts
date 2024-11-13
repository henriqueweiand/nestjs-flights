import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

import { LoggerModule } from '@app/logger';
import { CountryModule } from '@components/country';
import { EnvModule } from '@libs/env';
import { PersistenceModule } from '@libs/persistence';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AirportModule } from '@components/airport';

const app = 'FLIGHTS';

@Module({
  imports: [
    LoggerModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),
    EnvModule.register(app),
    PersistenceModule.registerTypeOrm(app),
    CountryModule,
    AirportModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
