import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async getFromCacheOrFetch<T>(
        cacheService: Redis,
        cacheKey: string,
        fetchFunction: () => Promise<T>,
    ): Promise<T> {
        try {
            const cachedData = await cacheService.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData) as T;
            }
            const data = await fetchFunction();
            await cacheService.set(
                cacheKey,
                JSON.stringify(data),
                'EX',
                this.configService.get<number>('CACHE_EXPIRATION', 3600)
            );
            return data;
        } catch (err) {
            console.warn(`Failed to find data from cache with key: [${cacheKey}]`, err);
            return fetchFunction();
        }
    }

    async invalidateCache(cacheService: Redis, cacheKey: string): Promise<void> {
        await cacheService.del(cacheKey);
    }
}