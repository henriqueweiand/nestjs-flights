
export interface AviationStackConfig {
    apiKey: string;
    baseUrl: string;
}

export interface AviationStackCoutries {
    id: string;
    country_id: string;
    country_name: string;
    country_iso2: string;
    country_iso3: string;
    country_iso_numeric: string;
    population: string;
    capital: string;
    continent: string;
    currency_name: string;
    currency_code: string;
    fips_code: string;
    phone_prefix: string;
}

export interface AviationStackAirports {
    id: string;
    airport_name: string;
    iata_code: string;
    icao_code: string;
    latitude: string;
    longitude: string;
    geoname_id: string;
    timezone: string;
    gmt: string;
    phone_number?: string;
    country_name: string;
    country_iso2: string;
    city_iata_code: string;
}

export interface AviationStackFlights {
    id: string;
    flight_date: string;
    flight_status: string;
    departure: AviationStackDeparture;
    arrival: AviationStackArrival;
    airline: AviationStackAirline;
    flight: AviationStackFlightDetails;
    aircraft: AviationStackAircraft;
}

export interface AviationStackDeparture {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: string;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
}

export interface AviationStackArrival {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    baggage: string;
    delay: string;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
}

export interface AviationStackAirline {
    name: string;
    iata: string;
    icao: string;
}

export interface AviationStackFlightDetails {
    number: string;
    iata: string;
    icao: string;
    codeshared: string | null;
}

export interface AviationStackAircraft {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
}