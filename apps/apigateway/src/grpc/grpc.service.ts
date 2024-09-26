/* eslint-disable prettier/prettier */
import { MESSAGE_PACKAGE_NAME, MESSAGE_SERVICE_NAME, MessageServiceClient, Request, Response } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class GrpcClientService {
    private logger: Logger = new Logger(`GrpcMessageService`)
    private messageService: MessageServiceClient;

    constructor(@Inject(MESSAGE_PACKAGE_NAME) private messageClient: ClientGrpc) { }

    onModuleInit() {
        this.messageService = this.messageClient.getService<MessageServiceClient>(MESSAGE_SERVICE_NAME);
    }
    
    stream(streamRequest: Request): Observable<Response> {
        this.logger.log(`Calling Microservice GRPC tp stream ${streamRequest.message}`)
        return this.messageService.returnStreamResponse(streamRequest)
    }
}
