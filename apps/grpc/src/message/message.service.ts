import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { MessageServiceClient, StreamRequest, StreamResponse } from './message.interface';

@Injectable()
export class MessageService implements MessageServiceClient{
    stream(data: StreamRequest): Observable<StreamResponse> {
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


