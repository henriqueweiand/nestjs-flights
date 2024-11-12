import { DynamicModule, Module, Type } from '@nestjs/common';

@Module({})
export class DataProviderModule {
  static withAdapter(adapter: Type | DynamicModule): DynamicModule {
    return {
      module: DataProviderModule,
      imports: [adapter],
      exports: [adapter],
    };
  }
}
