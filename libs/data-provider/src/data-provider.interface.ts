

export interface FlightQueryParams {
    access_key: string;
    flight_date?: string;
    callback?: string;
    limit?: number;
    offset?: number;
    flight_status?: string;
    dep_iata?: string;
    arr_iata?: string;
    dep_icao?: string;
    arr_icao?: string;
    airline_name?: string;
    airline_iata?: string;
    airline_icao?: string;
    flight_number?: string;
    flight_iata?: string;
    flight_icao?: string;
    min_delay_dep?: number;
    min_delay_arr?: number;
    max_delay_dep?: number;
    max_delay_arr?: number;
    arr_scheduled_time_arr?: string;
    arr_scheduled_time_dep?: string;
}