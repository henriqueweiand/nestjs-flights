import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule as LoggerModulePino } from 'nestjs-pino';

import LoggerConfig from './logger.config';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forFeature(LoggerConfig),
    LoggerModulePino.forRoot({
      pinoHttp: {
        quietResLogger: true,
        quietReqLogger: true,
        autoLogging: false,
        transport: { target: 'pino-pretty' }
      },
    })
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule { }
