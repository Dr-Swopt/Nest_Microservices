/* eslint-disable prettier/prettier */
import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger: Logger = new Logger('TCP App Controller')
  constructor(private readonly tcpService: AppService) {}

}
