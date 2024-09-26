import { Request, Response } from '@app/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger(`GRPC-MessageService`)

  constructor() { }

  onModuleInit() { }

  returnStream(request: Request): Observable<Response> {
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


