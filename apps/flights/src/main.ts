import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { FlightsModule } from './flights.module';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  await app.listen(port);
}
bootstrap();
