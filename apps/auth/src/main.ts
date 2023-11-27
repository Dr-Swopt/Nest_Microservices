import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000).then(() => {
    Logger.log(`[Test] Express server is listening to port 3000...`)
  })
}
bootstrap();
