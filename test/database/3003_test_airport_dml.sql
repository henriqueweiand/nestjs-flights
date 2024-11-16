-- **** <airport> ****
COPY public.airport (id,airport_name,iata_code,icao_code,latitude,longitude,timezone,gmt,phone_number,external_id,country_name,provider,country_id) 
FROM '/var/lib/postgresql/csv/airport/airport.csv' WITH DELIMITER ',' NULL AS '' CSV HEADER;
-- **** </airport> ****