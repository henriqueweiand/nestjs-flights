-- **** <country> ****
COPY public.country (id,capital,currency_code,continent,country_name,currency_name,phone_prefix,external_id,country_iso2,country_iso3,provider) 
FROM '/var/lib/postgresql/csv/country/country.csv' WITH DELIMITER ',' NULL AS '' CSV HEADER;
-- **** </country> ****