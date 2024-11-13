import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { FlightsModule } from './flights.module';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule, {
    snapshot: true,
    abortOnError: false,
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  await app.listen(port);
}
bootstrap();
