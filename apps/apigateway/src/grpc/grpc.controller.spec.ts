import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientController } from './grpc.controller';
import { GrpcClientService } from './grpc.service';

describe('GrpcClientController', () => {
  let controller: GrpcClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcClientController],
      providers: [GrpcClientService],
    }).compile();

    controller = module.get<GrpcClientController>(GrpcClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
