import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { AUTH_PACKAGE_NAME } from '@app/common';

const mainLogger = new Logger(`AUTH Main`);

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../auth.proto'),
      url: `localhost:50052`
    },
  }
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, configurations);
  const app = await NestFactory.create(AuthModule)
  app.connectMicroservice<MicroserviceOptions>(configurations)

  app.startAllMicroservices().then(() => {
    mainLogger.log(`Auth server is listening`)
  }).catch(() => {
    throw new Error(`Auth Server failed to start`)
  })

  
  // await app.listen().then(() => {
  //   mainLogger.log(`Auth GRPC server is listening`)
  // }).catch(() => {
  //   throw new Error(`Auth Server failed to start`)
  // })
}

bootstrap();
