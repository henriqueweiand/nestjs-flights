import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

import { EnvModule } from '@libs/env';
import { PersistenceModule } from '@libs/persistence';
import { CountryModule } from '@components/country';
import { DevtoolsModule } from '@nestjs/devtools-integration';

const app = 'FLIGHTS';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),
    EnvModule.register(app),
    PersistenceModule.registerTypeOrm(app),
    CountryModule
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
