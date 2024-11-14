import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService, CacheStrategy } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';

import { C_AIRPORTS_KEY } from './airport.constants';
import { Airport } from './entities/airport.entity';
import { CountryService } from '@components/country/country.service';

@Injectable()
export class AirportService {
  private readonly logger: Logger;

  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
    @Inject(CACHE.C_AIRPORT) private readonly airportCache: Redis,
    private readonly cacheService: CacheService,
    private readonly loggerService: LoggerService,
    private readonly countryService: CountryService,
  ) {
    this.logger = this.loggerService.getLogger(AirportService.name);
  }

  async getAirports(dataStrategy: CacheStrategy = CacheStrategy.CACHE_DATABASE): Promise<Airport[]> {
    try {
      const countries = await this._getAllAirportsFromCache();

      if (!countries.length) {
        let fetchedCountries: Airport[];

        if (dataStrategy === CacheStrategy.CACHE_PROVIDER) {
          fetchedCountries = await this.dataProviderAdapter.getAirports(false);
        } else {
          fetchedCountries = await this._getAllAirportsFromDb();
        }

        await Promise.all(
          fetchedCountries.map(async (airport) => await this._findOrCreate(airport))
        );
        return fetchedCountries;
      }
      this.logger.log('Using the data from the cache');

      return countries;
    } catch (error) {
      this.logger.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  }

  private async _getAllAirportsFromDb(): Promise<Airport[]> {
    this.logger.log('Getting data from the database');

    return await this.airportRepository.find();
  }

  private async _getAllAirportsFromCache(): Promise<Airport[]> {
    this.logger.log('Getting data from the cache');
    const keys = await this.airportCache.keys(`${C_AIRPORTS_KEY}:*`);

    return await this.cacheService.getAllDataFromCache<Airport[]>(this.airportCache, keys);
  }

  private async _findOrCreate(airport: Airport): Promise<Airport> {
    try {
      let cacheKey = `${C_AIRPORTS_KEY}:${airport.id}`;

      // Check if the data is in the cache
      const cachedAirport = await this.cacheService.getCache<Airport>(this.airportCache, cacheKey);
      if (cachedAirport) {
        return cachedAirport;
      }

      if (!airport?.id) {
        // Check if the data is in the database
        let airportFromDb = await this.airportRepository.findOne({
          where: {
            name: airport.name,
          },
          relations: ['country'],
        });

        if (!airportFromDb) {
          const country = await this.countryService.getCountryByName(airport.countryName);

          airportFromDb = await this.airportRepository.save({
            ...airport,
            country: country || null,
          });
        }

        cacheKey = `${C_AIRPORTS_KEY}:${airportFromDb.id}`;
        await this.cacheService.setCache(this.airportCache, cacheKey, airportFromDb);

        return airportFromDb;
      } else {
        await this.cacheService.setCache(this.airportCache, cacheKey, airport);
      }

      return airport;
    } catch (error) {
      this.logger.error('Error finding or creating airport:', error);
    }
  }
}
