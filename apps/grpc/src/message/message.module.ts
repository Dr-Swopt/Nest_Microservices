import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MESSAGE_PACKAGE_NAME } from '@app/common';
import { MESSAGE_SERVICE } from '@app/common/types/constant';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MESSAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '../message.proto'),
          url: `localhost:3005`
        }
      }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
