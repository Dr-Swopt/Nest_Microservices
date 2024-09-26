import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const mainLogger = new Logger(`API gateway`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000).then(() => {
    mainLogger.log(`Application HTTP is running on:3000`);
  }).catch((err) => {
    mainLogger.error(err)
  })
}


bootstrap();
