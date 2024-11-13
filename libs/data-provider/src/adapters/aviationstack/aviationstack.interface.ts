
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