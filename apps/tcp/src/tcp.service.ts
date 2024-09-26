import { Injectable } from '@nestjs/common';

@Injectable()
export class TcpService {
  getHello(): string {
    return 'Hello World!';
  }
}
