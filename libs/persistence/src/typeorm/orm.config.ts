import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

config({ path: join(__dirname + '../../../../../', '.env') });
config({ path: join(__dirname + '../../../../../', '.env.local'), override: true });

const configService = new ConfigService();

// Change the following line to match the name of the app
const dataSourceOptions = {
  type: 'postgres',
  host: configService.get('CLI-ENRICHER.HOST'),
  port: configService.get<number>('CLI-ENRICHER.PORT'),
  username: configService.get('CLI-ENRICHER.USERNAME'),
  password: configService.get('CLI-ENRICHER.PASSWORD'),
  database: configService.get('CLI-ENRICHER.DATABASE'),
  entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
