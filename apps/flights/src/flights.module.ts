import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { PersistenceModule } from '@libs/persistence';

@Module({
  imports: [PersistenceModule],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
