import { Module } from '@nestjs/common';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [GeneralModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
