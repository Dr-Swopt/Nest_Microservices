/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const mainLogger = new Logger(`TCP-Server`);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen().then(() => {
    mainLogger.log('TCP server started')
  }).catch((err) => {
    mainLogger.error(err)
  })
}

bootstrap();
