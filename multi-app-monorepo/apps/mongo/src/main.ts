import { NestFactory } from '@nestjs/core';
import { MongoModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(MongoModule);
   app.enableShutdownHooks();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
