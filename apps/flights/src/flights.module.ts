import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

import { AviationStackModule, DataProviderModule } from '@app/data-provider';
import { EnvModule } from '@libs/env';
import { PersistenceModule } from '@libs/persistence';

const app = 'FLIGHTS';

@Module({
  imports: [
    EnvModule.register(app),
    PersistenceModule.registerTypeOrm(app),
    DataProviderModule.withAdapter(AviationStackModule.withCache()),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
