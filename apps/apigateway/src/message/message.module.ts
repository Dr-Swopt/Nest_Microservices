import { MESSAGE_PACKAGE_NAME } from "@app/common";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { MESSAGE_SERVICE } from "@app/common/types/constant";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MESSAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '../message.proto'),
          url: `localhost:3002`
        }
      }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
