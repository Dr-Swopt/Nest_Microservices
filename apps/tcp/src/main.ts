/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { TcpModule } from './tcp.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const mainLogger = new Logger(`TCP-Server-Publisher`);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TcpModule,
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
