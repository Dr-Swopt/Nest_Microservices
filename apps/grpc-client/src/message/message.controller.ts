import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Check, MessageLog, MessageServiceController, MessageServiceControllerMethods, StreamRequest, StreamResponse } from '@app/common';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';

@Controller('message')
@MessageServiceControllerMethods()
export class MessageController implements MessageServiceController {
  private logger: Logger = new Logger(`MessageController`)
  constructor(private messageService: MessageService) {
    // this.streaming({ id: `123`, message: `I want message now!` })
  }

  @Post(`stream`)
  streaming(@Body() streamRequest: StreamRequest) {
    this.stream(streamRequest).subscribe({
      next: message => {
        let msg: MessageLog = JSON.parse(message.message)
        console.log(msg.appData.msgId)
      },
      error: err => console.error(err),
      complete: () => { }
    })
  }

  @Get()
  checking() {
    let checking: Check = {
      message: `How are you?`
    }
    this.check(checking).subscribe({
      next: message => this.logger.log(message.message),
      error: err => this.logger.log(err),
      complete: () => this.logger.log(`Request Completed`)
    })
  }

  check(check: Check): Observable<Check> {
    return this.messageService.check(check)
  }

  stream(StreamRequest: StreamRequest): Observable<StreamResponse> {
    this.logger.log(`Call message service...transferring stream request...`)
    return this.messageService.stream(StreamRequest)

  }
}
