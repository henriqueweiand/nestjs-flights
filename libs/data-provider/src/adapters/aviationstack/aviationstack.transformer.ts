import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';

import { AviationStackAirports, AviationStackArrival, AviationStackCoutries, AviationStackDeparture, AviationStackFlights } from './aviationstack.interface';
import { DataProviderEnum } from '@app/data-provider/enums/data-provider.enum';
import { Airport } from '@components/airport/entities/airport.entity';
import { Flight } from '@components/flight/entities/flight.entity';
import { Arrival } from '@components/flight/entities/arrival.entity';
import { Departure } from '@components/flight/entities/departure.entity';

@Injectable()
export class AviationStackModuleTransformer {
  transformCountries(aviationstackCountry: AviationStackCoutries): Country {
    return new Country({
      capital: aviationstackCountry.capital,
      continent: aviationstackCountry.continent,
      countryName: aviationstackCountry.country_name,
      currencyCode: aviationstackCountry.currency_code,
      currencyName: aviationstackCountry.currency_name,
      phonePrefix: aviationstackCountry.phone_prefix,
      countryIso2: aviationstackCountry.country_iso2,
      countryIso3: aviationstackCountry.country_iso3,
      externalId: aviationstackCountry.id,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }

  transformAirports(aviationstackCountry: AviationStackAirports): Airport {
    return new Airport({
      name: aviationstackCountry.airport_name,
      aitaCode: aviationstackCountry.iata_code,
      acaoCode: aviationstackCountry.icao_code,
      latitude: aviationstackCountry.latitude,
      longitude: aviationstackCountry.longitude,
      timezone: aviationstackCountry.timezone,
      gmt: aviationstackCountry.gmt,
      phoneNumber: aviationstackCountry.phone_number,
      countryName: aviationstackCountry.country_name,
      externalId: aviationstackCountry.id,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }

  transformFlights(aviationstackCountry: AviationStackFlights): Flight {
    return new Flight({
      externalId: aviationstackCountry.id,
      date: aviationstackCountry.flight_date,
      status: aviationstackCountry.flight_status,
      number: aviationstackCountry.flight.number,
      iata: aviationstackCountry.flight.iata,
      icao: aviationstackCountry.flight.icao,
      airline: aviationstackCountry.airline,
      aircraft: aviationstackCountry.aircraft,
      provider: DataProviderEnum.AVIATION_STACK,
      departure: this.transformDeparture(aviationstackCountry.departure),
      arrival: this.transformArrival(aviationstackCountry.arrival),
    });
  }

  transformDeparture(aviationstackDeparture: AviationStackDeparture): Departure {
    return new Departure({
      // airport: aviationstackDeparture.airport, // This field is populated later
      iata: aviationstackDeparture.iata,
      icao: aviationstackDeparture.icao,
      terminal: aviationstackDeparture.terminal,
      gate: aviationstackDeparture.gate,
      delay: aviationstackDeparture.delay,
      scheduled: new Date(aviationstackDeparture.scheduled),
      estimated: new Date(aviationstackDeparture.estimated),
      actual: new Date(aviationstackDeparture.actual),
      estimatedRunway: new Date(aviationstackDeparture.estimated_runway),
      actualRunway: new Date(aviationstackDeparture.actual_runway),
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }

  transformArrival(aviationstackArrival: AviationStackArrival): Arrival {
    return new Arrival({
      // airport: aviationstackArrival.airport, // This field is populated later
      iata: aviationstackArrival.iata,
      icao: aviationstackArrival.icao,
      terminal: aviationstackArrival.terminal,
      gate: aviationstackArrival.gate,
      baggage: aviationstackArrival.baggage,
      delay: aviationstackArrival.delay,
      scheduled: new Date(aviationstackArrival.scheduled),
      estimated: new Date(aviationstackArrival.estimated),
      actual: aviationstackArrival.actual ? new Date(aviationstackArrival.actual) : null,
      estimatedRunway: aviationstackArrival.estimated_runway ? new Date(aviationstackArrival.estimated_runway) : null,
      actualRunway: aviationstackArrival.actual_runway ? new Date(aviationstackArrival.actual_runway) : null,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }
}
