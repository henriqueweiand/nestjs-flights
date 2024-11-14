import { DynamicModule, Module } from '@nestjs/common';

import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';

import { AviationStackRequesterModule } from './aviationstack-requester/aviationstack-requester.module';
import { AviationStackModuleAdapter } from './aviationstack.adapter';
import { AviationStackModuleTransformer } from './aviationstack.transformer';
import { DataProviderEnricherModule } from '@app/data-provider/enricher/data-provider-enricher.module';

@Module({})
export class AviationStackModule {
  static withCache(): DynamicModule {
    return {
      module: AviationStackModule,
      imports: [
        AviationStackRequesterModule,
        DataProviderEnricherModule,
      ],
      providers: [
        {
          provide: DataProviderAdapter,
          useClass: AviationStackModuleAdapter
        },
        AviationStackModuleTransformer
      ],
      exports: [DataProviderAdapter],
    };
  }
}
