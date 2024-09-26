/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Check, StreamRequest, StreamResponse } from '@app/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService implements OnModuleInit {
  private logger = new Logger(`MessageService`)

  constructor() { }

  onModuleInit() {
  }

  check(check: Check): Check {
    this.logger.log(`Received check request: ${check.message}`)
    let response: Check = {
      message: `I am the main GRPC publisher!`
    }
    return response
  }

  stream(request: StreamRequest): Observable<StreamResponse> {
    return new Observable((observer => {
      this.logger.log(`Received ${request.id}:: Preparing && Returning stream for client...`)
      let count = 0
      const intervalId = setInterval(() => {
        observer.next({
          id: `${count}`,
          message: `I am message ${count}`
        });
        count++;
        if (count >= 100) {
          clearInterval(intervalId);
          observer.complete();
        }
      }, 1)
    }))
  }
}


