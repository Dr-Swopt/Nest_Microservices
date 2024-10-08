import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientService } from './grpc.service';

describe('MessageService', () => {
  let service: GrpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcClientService],
    }).compile();

    service = module.get<GrpcClientService>(GrpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
