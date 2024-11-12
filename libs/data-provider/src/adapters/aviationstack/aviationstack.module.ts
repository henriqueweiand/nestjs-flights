import { DynamicModule, Module } from '@nestjs/common';

import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';

import { AviationStackRequesterModule } from './aviationstack-requester/aviationstack-requester.module';
import { AviationStackModuleAdapter } from './aviationstack.adapter';
import { AviationStackModuleTransformer } from './aviationstack.transformer';

@Module({})
export class AviationStackModule {
  static withCache(): DynamicModule {
    return {
      module: AviationStackModule,
      imports: [
        AviationStackRequesterModule
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
