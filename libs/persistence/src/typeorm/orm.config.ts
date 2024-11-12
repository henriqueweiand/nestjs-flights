import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

require('tsconfig-paths/register');

config({ path: join(__dirname + '../../../../../', '.env') });
config({ path: join(__dirname + '../../../../../', '.env.local'), override: true });

const configService = new ConfigService();

// Change the following line to match the name of the app
const dataSourceOptions = {
  type: 'postgres',
  host: configService.get('FLIGHTS.HOST'),
  port: configService.get<number>('FLIGHTS.PORT'),
  username: configService.get('FLIGHTS.USERNAME'),
  password: configService.get('FLIGHTS.PASSWORD'),
  database: configService.get('FLIGHTS.DATABASE'),
  entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  logging: true,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
