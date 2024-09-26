import { Test, TestingModule } from '@nestjs/testing';
import { TcpController } from './tcp.controller';
import { TcpService } from './tcp.service';

describe('TcpController', () => {
  let tcpController: TcpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TcpController],
      providers: [TcpService],
    }).compile();

    tcpController = app.get<TcpController>(TcpController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tcpController.getHello()).toBe('Hello World!');
    });
  });
});
