import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Check, MessageLog, MessageServiceController, MessageServiceControllerMethods, StreamRequest, StreamResponse } from '@app/common';
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
  streaming(@Body() streamRequest: StreamRequest) {
    let resultObs = this.stream(streamRequest).subscribe({
      next: message => {
        let msg: MessageLog = JSON.parse(message.message)
        console.log(msg.appData.msgId)
      },
      error: err => console.error(err),
      complete: () => this.logger.log(`Stream Request for "${streamRequest.message}" Completed`)
    })
    return resultObs
  }

  check(check: Check): Observable<Check> {
    return this.messageService.check(check)
  }

  stream(request: StreamRequest): Observable<StreamResponse> {
    return this.messageService.stream(request)
  }
}
