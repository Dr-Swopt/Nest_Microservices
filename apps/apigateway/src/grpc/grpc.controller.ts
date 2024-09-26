import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { GrpcClientService } from './grpc.service';
import { Message, GrpcMessageServiceController, GrpcMessageServiceControllerMethods, Request, Response } from '@app/common';
import { Observable } from 'rxjs';

@Controller('grpc')
@GrpcMessageServiceControllerMethods()
export class GrpcClientController implements GrpcMessageServiceController {
  private logger = new Logger(`MessageController`)

  constructor(private readonly messageService: GrpcClientService) {
  }

  returnResponse(request: any): Response {
    return { id: '123', message: JSON.stringify(request) }
  }

  returnStreamResponse(request: Request): Observable<Response> {
    return new Observable((observer) => {
      this.messageService.stream(request).subscribe({
        next: message => observer.next(message),
        error: error => observer.error(),
        complete: () => observer.complete()
      })
    })
  }

  bidirectionalStream(request: Observable<Request>): Observable<Response> {
    throw new Error('Method not implemented.');
  }

  @Get()
  get() {
    return 'APIGATEWAY'
  }

  @Post(`stream`)
  streaming(@Body() request: Request): Observable<Message> {
    return new Observable((observer) => {
      this.logger.log(`Requesting some response from apigateway...`)
      this.returnStreamResponse(request).subscribe({
        next: message => {
          observer.next({ id: message.id, payload: message.message })
        },
        error: err => console.error(err),
        complete: () => {
          this.logger.log(`Stream Request for "${request.message}" Completed`)
          observer.complete()
        }
      })
    })

  }

}
