-- **** <migrations> ****
COPY public.migrations (id,timestamp,name) 
FROM '/var/lib/postgresql/csv/migrations/migrations.csv' WITH DELIMITER ',' NULL AS '' CSV HEADER;
-- **** </migrations> ****