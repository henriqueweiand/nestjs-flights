import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AviationStackConfig } from '../aviationstack.config';
import { AviationStackRequesterService } from './aviationstack-requester.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(AviationStackConfig),
  ],
  providers: [
    AviationStackRequesterService
  ],
  exports: [
    AviationStackRequesterService
  ],
})
export class AviationStackRequesterModule {
}
