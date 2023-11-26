import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { StreamRequest, StreamResponse } from './message.interface';
import { Metadata, ServerReadableStream } from '@grpc/grpc-js';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) { }

  @GrpcStreamMethod()
  stream(data: StreamRequest, metadata: Metadata, call: ServerReadableStream<any, any>): Observable<StreamResponse> {
    return this.messageService.stream(data);
  }
}

