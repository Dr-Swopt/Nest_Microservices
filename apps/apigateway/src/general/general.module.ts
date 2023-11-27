import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, MESSAGE_SERVICE } from './constant';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, MESSAGE_PACKAGE_NAME } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MESSAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '../message.proto'),
          url: `localhost:50051`
        }
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
          url: `localhost:50052`
        }
      }
    ])
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule { }
