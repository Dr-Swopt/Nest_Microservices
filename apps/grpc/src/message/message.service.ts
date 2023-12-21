/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Check, MESSAGE_SERVICE_NAME, MessageLog, MessageServiceClient, StreamRequest, StreamResponse } from '@app/common';
import { MESSAGE_SERVICE } from '@app/common/types/constant';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService implements OnModuleInit {
  private logger = new Logger(`MessageService`)
  private messagesJSON: any = readFileSync('payload.json')
  private parsedMessages: MessageLog[] = JSON.parse(this.messagesJSON) // load the fake messages generated for this trial 
  private messageService: MessageServiceClient;

  constructor(@Inject(MESSAGE_SERVICE) private messageClient: ClientGrpc) { }

  onModuleInit() {
    this.messageService = this.messageClient.getService<MessageServiceClient>(MESSAGE_SERVICE_NAME)
  }

  check(check: Check): Check {
    this.logger.log(`Received check request: ${check.message}`)
    let response: Check = {
      message: `I am the main GRPC publisher!`
    }
    return response
  }

  stream(request: StreamRequest): Observable<StreamResponse> {
    this.logger.log(`Received ${request.id}:: Preparing && Returning stream for client...`)
    let result: Subject<StreamResponse> = new Subject()
    let messages: MessageLog[] = this.parsedMessages
    let count = 0
    const intervalId = setInterval(() => {
      result.next({
        id: `${count}`,
        message: JSON.stringify(messages[count])
      });
      count++;
      if (count >= 1000) {
        clearInterval(intervalId);
        result.complete();
      }
    }, 1)
    return result as Observable<StreamResponse>
  }
}


