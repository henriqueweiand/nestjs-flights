import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '@app/logger';

import { AviationStackConfig } from '../aviationstack.config';
import { AviationStackRequesterService } from './aviationstack-requester.service';

@Module({
  imports: [
    LoggerModule,
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
