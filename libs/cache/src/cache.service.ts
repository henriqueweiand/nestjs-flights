import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Logger, LoggerService } from '@app/logger';

@Injectable()
export class CacheService {
    private readonly logger: Logger

    constructor(
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService
    ) {
        this.logger = this.loggerService.getLogger(CacheService.name);
    }

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
            this.logger.warn(`Failed to find data from cache with key: [${cacheKey}]`, err);
            return fetchFunction();
        }
    }

    async invalidateCache(cacheService: Redis, cacheKey: string): Promise<void> {
        await cacheService.del(cacheKey);
    }

    async getAllDataFromCache<T>(cacheService: Redis, keys: string[]) {
        const data = await Promise.all(
            keys.map(async (key) => {
                const cachedCountry = await cacheService.get(key);
                return JSON.parse(cachedCountry);
            })
        );

        return data as T;
    }

    async setCache(cacheService: Redis, cacheKey: string, data: unknown): Promise<void> {
        await cacheService.set(
            cacheKey,
            JSON.stringify(data),
            'EX',
            this.configService.get<number>('CACHE_EXPIRATION', 3600)
        );
    }

    async getCache<T>(cacheService: Redis, cacheKey: string): Promise<T | null> {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData) as T;
        }
        return null;
    }
}