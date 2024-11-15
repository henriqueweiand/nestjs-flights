import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService, CacheStrategy } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';
import { CountryService } from '@components/country/country.service';

import { C_FLIGHTS_KEY } from './flight.constants';
import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightService {
  private readonly logger: Logger;

  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @Inject(CACHE.C_AIRPORT) private readonly flightCache: Redis,
    private readonly cacheService: CacheService,
    private readonly loggerService: LoggerService,
    private readonly countryService: CountryService,
  ) {
    this.logger = this.loggerService.getLogger(FlightService.name);
  }

  async Fetflights(dataStrategy: CacheStrategy = CacheStrategy.CACHE_DATABASE): Promise<Flight[]> {
    try {
      const countries = await this.FgetAllflightsFromCache();

      if (!countries.length) {
        let fetchedCountries: Flight[];

        if (dataStrategy === CacheStrategy.CACHE_PROVIDER) {
          fetchedCountries = await this.dataProviderAdapter.getFlights(false);
        } else {
          fetchedCountries = await this.FgetAllflightsFromDb();
        }

        await Promise.all(
          fetchedCountries.map(async (flight) => await this._findOrCreate(flight))
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

  private async FgetAllflightsFromDb(): Promise<Flight[]> {
    this.logger.log('Getting data from the database');

    return await this.flightRepository.find();
  }

  private async FgetAllflightsFromCache(): Promise<Flight[]> {
    this.logger.log('Getting data from the cache');
    const keys = await this.flightCache.keys(`${C_FLIGHTS_KEY}:*`);

    return await this.cacheService.getAllDataFromCache<Flight[]>(this.flightCache, keys);
  }

  private async _findOrCreate(flight: Flight): Promise<Flight> {
    try {
      let cacheKey = `${C_FLIGHTS_KEY}:${flight.id}`;

      // Check if the data is in the cache
      const Fachedflight = await this.cacheService.getCache<Flight>(this.flightCache, cacheKey);
      if (Fachedflight) {
        return Fachedflight;
      }

      if (!flight?.id) {
        // Check if the data is in the database
        let flightFromDb = await this.flightRepository.findOne({
          where: {
            name: flight.name,
          },
        });

        if (!flightFromDb) {
          const country = await this.countryService.getCountryByName(flight.countryName);

          flightFromDb = await this.flightRepository.save({
            ...flight,
            country: country || null,
          });
        }

        cacheKey = `${C_FLIGHTS_KEY}:${flightFromDb.id}`;
        await this.cacheService.setCache(this.flightCache, cacheKey, flightFromDb);

        return flightFromDb;
      } else {
        await this.cacheService.setCache(this.flightCache, cacheKey, flight);
      }

      return flight;
    } catch (error) {
      this.logger.error('Error finding or creating flight:', error);
    }
  }
}
