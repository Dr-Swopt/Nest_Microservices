import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MESSAGE_PACKAGE_NAME } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MESSAGE_SERVICE } from '../../../../libs/common/src/types/constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MESSAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '../message.proto'),
          url: `localhost:3001`
        }
      }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
