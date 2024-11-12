import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataProviderModule, AviationStackModule } from '@app/data-provider';

import { Country } from './entities/country.entity';
import { CountryService } from './country.service';

@Module({
  imports: [
    DataProviderModule.withAdapter(AviationStackModule.withCache()),
    TypeOrmModule.forFeature([Country]),
  ],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule { }
