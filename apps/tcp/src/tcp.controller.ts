import { Controller, Get } from '@nestjs/common';
import { TcpService } from './tcp.service';

@Controller()
export class TcpController {
  constructor(private readonly tcpService: TcpService) {}

  @Get()
  getHello(): string {
    return this.tcpService.getHello();
  }
}
