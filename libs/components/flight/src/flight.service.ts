import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

import { CacheService } from '@app/cache';
import { CACHE } from '@app/cache/cache.constants';
import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Logger, LoggerService } from '@app/logger';
import { FlightQueryParams } from '@app/data-provider/data-provider.interface';
import { AirportService } from '@components/airport/airport.service';

import { Flight } from './entities/flight.entity';
import { C_FLIGHTS_KEY, C_SEARCH_FLIGHTS_KEY } from './flight.constants';

@Injectable()
export class FlightService {
  private readonly logger: Logger;

  constructor(
    private readonly dataProviderAdapter: DataProviderAdapter,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @Inject(CACHE.C_FLIGHT) private readonly flightCache: Redis,
    private readonly cacheService: CacheService,
    private readonly loggerService: LoggerService,
    private readonly airportService: AirportService,
  ) {
    this.logger = this.loggerService.getLogger(FlightService.name);
  }

  private _generateSearchCacheKey(searchParams?: FlightQueryParams): string {
    return `${C_SEARCH_FLIGHTS_KEY}:${searchParams ? JSON.stringify(searchParams) : 'none'}`;
  }

  private _generateFlightCacheKey(flight: Flight): string {
    const date = flight.date instanceof Date ? flight.date : new Date(flight.date);
    const formattedDate = date.toISOString().replace(/:/g, '-');
    const departureIata = flight?.departure?.iata || 'unknown';

    return `${C_FLIGHTS_KEY}:${flight.number}:${formattedDate}:${departureIata}`;
  }

  async getFlights(searchParams?: FlightQueryParams): Promise<Flight[]> {
    this.logger.log('Fetching flights');
    try {
      const cacheKey = this._generateSearchCacheKey(searchParams);
      const cachedFlights = await this.cacheService.getCache<Flight[]>(this.flightCache, cacheKey);

      if (cachedFlights) {
        this.logger.log('Using the data from the cache');
        return cachedFlights.filter((flight) => flight.id);
      }

      const fetchedFlights = await this.dataProviderAdapter.getFlights(false, searchParams);

      const processedFlights = await Promise.all(
        fetchedFlights.map(async (flight) => await this._findOrCreate(flight))
      );
      const filteredFlights = processedFlights.filter((flight) => flight);

      await this.cacheService.setCache(this.flightCache, cacheKey, filteredFlights, 1800); // TTL 30 minutes

      return filteredFlights;
    } catch (error) {
      this.logger.error('Error fetching flights:', error);
      throw new Error('Failed to fetch flights');
    }
  }

  private async _findOrCreate(flight: Flight): Promise<Flight> {

    if (!flight.number || !flight.date || !flight.iata || !flight.icao) {
      this.logger.error('Invalid flight data:', flight);
      return null;
    }

    try {
      let cacheKey = this._generateFlightCacheKey(flight);

      // Check if the data is in the cache
      const Fachedflight = await this.cacheService.getCache<Flight>(this.flightCache, cacheKey);
      if (Fachedflight) {
        return Fachedflight;
      }

      // Check if the data is in the database
      let flightFromDb = await this.flightRepository.findOne({
        where: {
          number: flight.number,
          date: flight.date,
          departure: flight.departure,
        },
        relations: ['departure', 'arrival'],
      });

      if (!flightFromDb) {
        const airportDeparture = await this.airportService.getOneByName(flight.departure.airportName);
        const airportArrival = await this.airportService.getOneByName(flight.arrival.airportName);
        flight.departure.airport = airportDeparture || null;
        flight.arrival.airport = airportArrival || null;

        flightFromDb = await this.flightRepository.save(flight);
      }

      cacheKey = this._generateFlightCacheKey(flightFromDb);
      await this.cacheService.setCache(this.flightCache, cacheKey, flightFromDb);

      return flightFromDb;
    } catch (error) {
      console.log('Error finding or creating flight:', flight, error);
      this.logger.error('Error finding or creating flight: %o', error);
    }
  }
}
