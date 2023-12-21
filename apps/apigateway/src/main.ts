/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './apigateway.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MESSAGE_PACKAGE_NAME } from '@app/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { join } from 'path';

const mainLogger = new Logger(`API gateway`);

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: MESSAGE_PACKAGE_NAME,
      protoPath: join(__dirname, '../message.proto'),
      url: `localhost:3005`
    },
  }
  const app = await NestFactory.create(ApiGatewayModule);
  app.connectMicroservice<MicroserviceOptions>(configurations)

  await app.startAllMicroservices().then(() => {
    mainLogger.log(`Application GRPC is running on:3005`);
  }).catch((err) => {
    mainLogger.error(err)
  })

  await app.listen(3000).then(() => {
    mainLogger.log(`Application HTTP is running on:3000`);
  }).catch((err) => {
    mainLogger.error(err)
  })
}



bootstrap();
