import { CountryModule } from '@components/country';
import { Module } from '@nestjs/common';

import { DataProviderEnricherService } from './data-provider-enricher.service';

@Module({
  imports: [CountryModule],
  providers: [DataProviderEnricherService],
  exports: [DataProviderEnricherService],
})
export class DataProviderEnricherModule { }
