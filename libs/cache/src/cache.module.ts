import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { LoggerModule } from '@app/logger';
import { EnvModule } from '@libs/env';

import { CacheFactory } from './cache.factory';
import { CacheService } from './cache.service';

export type RedisClient = Redis;

@Module({
  imports: [
    LoggerModule,
    EnvModule.register()
  ],
  providers: [
    CacheFactory,
    CacheService,
  ],
  exports: [
    CacheService,
  ]
})
export class CacheModule {
  static register(cacheInit: string[]): DynamicModule {
    const providers = [
      ...cacheInit.map(cacheInit => {
        return {
          provide: cacheInit,
          useFactory: (
            cacheManager: CacheFactory,
            configService: ConfigService
          ) => {
            return cacheManager.getCacheService(cacheInit, {
              host: configService.getOrThrow<string>('REDIS_HOST'),
              port: configService.getOrThrow<number>('REDIS_PORT'),
            });
          },
          inject: [CacheFactory, ConfigService],
        };
      }),
    ];

    return {
      module: CacheModule,
      providers,
      exports: [...providers],
    }
  }
}
