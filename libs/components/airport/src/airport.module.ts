import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { AviationStackModule, DataProviderModule } from '@app/data-provider';
import { LoggerModule } from '@app/logger';
import { CountryModule } from '@components/country';

import { AirportService } from './airport.service';
import { Airport } from './entities/airport.entity';
import { AirportResolver } from './airport.resolver';
import { AiportFieldsResolver } from './airport-fields.resolver';
import { AirportCountryDataloader } from './aiport-country.dataloader';

@Module({
  imports: [
    LoggerModule,
    CountryModule,
    DataProviderModule.withAdapter(AviationStackModule.register()),
    TypeOrmModule.forFeature([Airport]),
    CacheModule.register([CACHE.C_AIRPORT]),
  ],
  providers: [AirportService, AirportResolver, AiportFieldsResolver, AirportCountryDataloader],
  exports: [AirportService],
})
export class AirportModule { }
