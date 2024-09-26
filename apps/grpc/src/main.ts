/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { Logger } from '@nestjs/common';
import { MESSAGE_PACKAGE_NAME } from '@app/common';

const mainLogger = new Logger(`Grpc-Server-Publisher`);

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: MESSAGE_PACKAGE_NAME,
      protoPath: join(__dirname, '../message.proto'),
      url: `localhost:4000`
    },
  }
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>(configurations) // used for the case to cater for multiple microservice

  app.startAllMicroservices().then(() => {
    mainLogger.log(`Grpc server is listening`)
  }).catch(() => {
    throw new Error(`Grpc Server failed to start`)
  })
}

bootstrap();
