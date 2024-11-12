import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

import { PersistenceModule } from '@libs/persistence';
import { EnvModule } from '@libs/env';

const app = 'FLIGHTS';

@Module({
  imports: [
    EnvModule.register(app),
    PersistenceModule.registerTypeOrm(app),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
