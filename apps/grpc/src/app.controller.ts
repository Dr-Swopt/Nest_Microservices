import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMessageServiceController, GrpcMessageServiceControllerMethods, Request, Response } from '@app/common';
import { error } from 'console';

@Controller()
@GrpcMessageServiceControllerMethods()
export class AppController implements GrpcMessageServiceController {

  constructor(private messageService: AppService) {
  }

  returnResponse(request: any): Response {
    throw new Error('Method not implemented.');
  }

  returnStreamResponse(request: Request): Observable<Response> {
    return new Observable((observer) => {
      this.messageService.returnStream(request).subscribe({
        next: message => observer.next(message),
        error: error => observer.error(),
        complete: () => observer.complete()
      })
    })
  }

  bidirectionalStream(request: Observable<Request>): Observable<Response> {
    throw new Error('Method not implemented.');
  }

}