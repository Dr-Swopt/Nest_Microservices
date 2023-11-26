import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';

async function bootstrap() {
  let configurations: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'message',
      protoPath: join(__dirname, './message/message.proto'),
    },
  }
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, configurations);

  await app.listen();
  console.log(`Microservice is listening...`);
}
bootstrap();
