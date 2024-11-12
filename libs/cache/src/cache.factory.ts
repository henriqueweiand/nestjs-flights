import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class CacheFactory {
    private readonly cacheServices: Map<string, Redis> = new Map();

    getCacheService(cacheInit: string, options?: Partial<RedisOptions>): Redis {
        if (!this.cacheServices.has(cacheInit)) {
            const redisClient = new Redis(options);
            this.cacheServices.set(cacheInit, redisClient);
        }
        return this.cacheServices.get(cacheInit);
    }
}