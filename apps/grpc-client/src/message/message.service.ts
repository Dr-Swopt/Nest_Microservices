import { Check, MESSAGE_SERVICE_NAME, MessageServiceClient, StreamRequest, StreamResponse } from '@app/common';
import { MESSAGE_SERVICE } from '@app/common/types/constant';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private logger: Logger = new Logger(`MessageService`)
    private messageService: MessageServiceClient;

    constructor(@Inject(MESSAGE_SERVICE) private messageClient: ClientGrpc) { }

    onModuleInit() {
        this.messageService = this.messageClient.getService<MessageServiceClient>(MESSAGE_SERVICE_NAME);
    }

    check(args: Check): Observable<Check>{
        this.logger.log(`Requesting check with main Publisher`)
        return this.messageService.check(args)
    }

    stream(streamRequest: StreamRequest): Observable<StreamResponse> {
        this.logger.log(`Calling Microservice GRPC tp stream ${streamRequest.message}`)
        return this.messageService.stream(streamRequest)
    }
}
