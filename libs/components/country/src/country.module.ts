import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { AviationStackModule, DataProviderModule } from '@app/data-provider';
import { LoggerModule } from '@app/logger';

import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

@Module({
  imports: [
    LoggerModule,
    DataProviderModule.withAdapter(AviationStackModule.register()),
    TypeOrmModule.forFeature([Country]),
    CacheModule.register([CACHE.C_COUNTRY]),
  ],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule { }
