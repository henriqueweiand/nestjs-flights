import { NestFactory } from '@nestjs/core';
import { FlightsModule } from './flights.module';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
