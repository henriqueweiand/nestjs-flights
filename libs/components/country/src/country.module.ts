import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataProviderModule, AviationStackModule } from '@app/data-provider';
import { CacheModule } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';

import { Country } from './entities/country.entity';
import { CountryService } from './country.service';

@Module({
  imports: [
    DataProviderModule.withAdapter(AviationStackModule.withCache()),
    TypeOrmModule.forFeature([Country]),
    CacheModule.register([CACHE.C_COUNTRY]),
  ],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule { }
