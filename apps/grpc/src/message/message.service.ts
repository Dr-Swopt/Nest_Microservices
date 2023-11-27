import { MessageServiceClient, StreamRequest, StreamResponse } from '@app/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Observable, from } from 'rxjs';

@Injectable()
export class MessageService implements MessageServiceClient, OnModuleInit {
  private logger = new Logger(`MessageService`)

  constructor() {
    // logic here
  }
  
  onModuleInit() {
    // logic here
  }

  stream(data: StreamRequest): Observable<StreamResponse> {
    this.logger.log(`Returning stream for client...`)
    return new Observable<StreamResponse>(subscriber => {
      let count = 0;
      const intervalId = setInterval(() => {
        subscriber.next({
          id: `id-${count}`,
          message: `${data.message} Message ${count}`
        });
        count++;
      }, 1000); // Sends a new message every 1 second

      // Handle unsubscription
      return () => {
        clearInterval(intervalId);
      };
    });
  }
}


