/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Check, Message, MessageServiceController, MessageServiceControllerMethods, StreamRequest, StreamResponse } from '@app/common';
import { Observable } from 'rxjs';

@Controller('message')
@MessageServiceControllerMethods()
export class MessageController implements MessageServiceController {
  private logger = new Logger(`MessageController`)
  constructor(private readonly messageService: MessageService) {
  }

  @Get()
  checking() {
    let checkRequest: Check = {
      message: `Who are you`
    }
    let result: any
    this.check(checkRequest).subscribe({
      next: res => {
        result = res
        this.logger.log(res.message)
      },
      error: err => this.logger.error(err),
      complete: () => {
        this.logger.log(`CheckRequest: "${checkRequest.message} request`)
        return result
      }
    })
  }

  @Post(`stream`)
  streaming(@Body() streamRequest: StreamRequest): Observable<Message> {
    return new Observable((observer) => {
      this.logger.log(`Requesting some response from apigateway...`)
      this.stream(streamRequest).subscribe({
        next: message => {
          // console.log(message)
          observer.next({ id: message.id, payload: message.message })
        },
        error: err => console.error(err),
        complete: () => {
          this.logger.log(`Stream Request for "${streamRequest.message}" Completed`)
          observer.complete()
        }
      })
    })

  }

  check(check: Check): Observable<Check> {
    return this.messageService.check(check)
  }

  stream(request: StreamRequest): Observable<StreamResponse> {
    return this.messageService.stream(request)
  }

}
