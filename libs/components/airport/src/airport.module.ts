import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { AviationStackModule, DataProviderModule } from '@app/data-provider';
import { LoggerModule } from '@app/logger';

import { AirportService } from './airport.service';
import { Airport } from './entities/airport.entity';

@Module({
  imports: [
    LoggerModule,
    DataProviderModule.withAdapter(AviationStackModule.withCache()),
    TypeOrmModule.forFeature([Airport]),
    CacheModule.register([CACHE.C_AIRPORT]),
  ],
  providers: [AirportService],
  exports: [AirportService],
})
export class AirportModule { }
