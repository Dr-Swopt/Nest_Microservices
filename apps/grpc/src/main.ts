import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { Logger } from '@nestjs/common';
import { MESSAGE_PACKAGE_NAME } from '@app/common';

const mainLogger = new Logger(`GRPC Main`);

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: MESSAGE_PACKAGE_NAME,
      protoPath: join(__dirname,'../message.proto'),
      url: `localhost:50051`
    },
  }
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, configurations);

  await app.listen().then(() => {
    mainLogger.log(`GRPC server is listening... `)
  }).catch(() => { 
    throw new Error(`GRPC server failed to start`)
  })
}

bootstrap();
