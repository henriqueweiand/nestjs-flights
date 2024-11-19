import { Injectable } from '@nestjs/common';

import { Country } from '@components/country/entities/country.entity';

import { AviationStackAircraft, AviationStackAirports, AviationStackArrival, AviationStackCoutries, AviationStackDeparture, AviationStackFlights } from './aviationstack.interface';
import { DataProviderEnum } from '@app/data-provider/enums/data-provider.enum';
import { Airport } from '@components/airport/entities/airport.entity';
import { Flight } from '@components/flight/entities/flight.entity';
import { Arrival } from '@components/flight/entities/arrival.entity';
import { Departure } from '@components/flight/entities/departure.entity';
import { aircraft } from '@components/flight/interfaces/flight.interface';

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
      date: new Date(aviationstackCountry.flight_date),
      status: aviationstackCountry.flight_status,
      number: aviationstackCountry.flight.number,
      iata: aviationstackCountry.flight.iata,
      icao: aviationstackCountry.flight.icao,
      airline: aviationstackCountry.airline,
      aircraft: this.transformAircraft(aviationstackCountry.aircraft),
      provider: DataProviderEnum.AVIATION_STACK,
      departure: this.transformDeparture(aviationstackCountry.departure),
      arrival: this.transformArrival(aviationstackCountry.arrival),
    });
  }

  transformAircraft(aviationstackAircraft?: AviationStackAircraft): aircraft {
    if (!aviationstackAircraft) {
      return null;
    }

    return {
      registration: aviationstackAircraft.registration,
      iata: aviationstackAircraft.iata,
      icao: aviationstackAircraft.icao,
      icao24: aviationstackAircraft.icao24,
    };
  }

  transformDeparture(aviationstackDeparture?: AviationStackDeparture): Departure {
    if (!aviationstackDeparture) {
      return null;
    }

    return new Departure({
      airportName: aviationstackDeparture.airport,
      iata: aviationstackDeparture.iata,
      icao: aviationstackDeparture.icao,
      terminal: aviationstackDeparture.terminal,
      gate: aviationstackDeparture.gate,
      delay: aviationstackDeparture.delay,
      scheduled: aviationstackDeparture.scheduled ? new Date(aviationstackDeparture.scheduled) : null,
      estimated: aviationstackDeparture.estimated ? new Date(aviationstackDeparture.estimated) : null,
      actual: aviationstackDeparture.actual ? new Date(aviationstackDeparture.actual) : null,
      estimatedRunway: aviationstackDeparture.estimated_runway ? new Date(aviationstackDeparture.estimated_runway) : null,
      actualRunway: aviationstackDeparture.actual_runway ? new Date(aviationstackDeparture.actual_runway) : null,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }

  transformArrival(aviationstackArrival?: AviationStackArrival): Arrival {
    if (!aviationstackArrival) {
      return null;
    }

    return new Arrival({
      airportName: aviationstackArrival.airport,
      iata: aviationstackArrival.iata,
      icao: aviationstackArrival.icao,
      terminal: aviationstackArrival.terminal,
      gate: aviationstackArrival.gate,
      baggage: aviationstackArrival.baggage,
      delay: aviationstackArrival.delay,
      scheduled: aviationstackArrival.scheduled ? new Date(aviationstackArrival.scheduled) : null,
      estimated: aviationstackArrival.estimated ? new Date(aviationstackArrival.estimated) : null,
      actual: aviationstackArrival.actual ? new Date(aviationstackArrival.actual) : null,
      estimatedRunway: aviationstackArrival.estimated_runway ? new Date(aviationstackArrival.estimated_runway) : null,
      actualRunway: aviationstackArrival.actual_runway ? new Date(aviationstackArrival.actual_runway) : null,
      provider: DataProviderEnum.AVIATION_STACK,
    });
  }
}
