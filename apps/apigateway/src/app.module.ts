import { Module } from '@nestjs/common';
import { GrpcClientModule } from './grpc/grpc.module';
import { AppController } from './app.controller';

@Module({
  imports: [GrpcClientModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
