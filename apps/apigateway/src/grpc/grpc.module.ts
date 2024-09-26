/* eslint-disable prettier/prettier */
import { MESSAGE_PACKAGE_NAME } from "@app/common";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { GrpcClientController } from "./grpc.controller";
import { GrpcClientService } from "./grpc.service";
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
          url: `localhost:4000`,
        }
      },
      { name: 'TCP_SERVICE', transport: Transport.TCP },
    ])
  ],
  controllers: [GrpcClientController],
  providers: [GrpcClientService],
})
export class GrpcClientModule { }
