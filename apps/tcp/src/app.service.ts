/* eslint-disable prettier/prettier */
import { Request, Response } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
private logger: Logger = new Logger('TCP Service')

  getHello(): string {
    return 'Hello World!';
  }

  check(): string {
    return 'I AM TCP';
  }

  returnStream(request: Request): Observable<Response> {
    return new Observable((observer => {
      this.logger.log(`Received ${request.id}:: Preparing && Returning stream for client...`)
      let count = 0
      const intervalId = setInterval(() => {
        observer.next({
          id: `${count}`,
          message: `I am tcp message ${count}`
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
