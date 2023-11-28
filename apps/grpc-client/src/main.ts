import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { Logger } from '@nestjs/common';
import { MESSAGE_PACKAGE_NAME } from '@app/common';
import { GrpcClientModule } from './grpc-client.module';

const mainLogger = new Logger(`Grpc-client Subscriber`);

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: MESSAGE_PACKAGE_NAME,
      protoPath: join(__dirname, '../message.proto'),
      url: `localhost:3002`
    },
  }

  const app = await NestFactory.create(GrpcClientModule)
  app.connectMicroservice<MicroserviceOptions>(configurations) // used for the case to cater for multiple microservice

  app.startAllMicroservices()
  app.listen(4000).then(() => {
    mainLogger.log(`Grpc-client server is listening`)
  }).catch(() => {
    throw new Error(`Grpc-client Server failed to start`)
  })
}

bootstrap();
