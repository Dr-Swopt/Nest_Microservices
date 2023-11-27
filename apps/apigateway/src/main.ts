import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './apigateway.module';
import { Logger } from '@nestjs/common';

const mainLogger = new Logger(`API gateway`);

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(3000).then(() => {
    mainLogger.log(`Http server for API Gateway Application is listening on port 3000`)
  }).catch(() => {
    throw new Error(`API gateway Server failed to start!`)
  })
}
bootstrap();
