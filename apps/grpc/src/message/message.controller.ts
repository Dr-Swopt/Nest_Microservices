/* eslint-disable prettier/prettier */
import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { Check, MessageServiceController, MessageServiceControllerMethods, StreamRequest, StreamResponse } from '@app/common';

@Controller()
@MessageServiceControllerMethods()
export class MessageController implements MessageServiceController {
  constructor(private messageService: MessageService) {
  }

  check(check: Check): Check {
    console.log(`Received check request: ${check.message}`)
    return this.messageService.check(check)
  }

  stream(request: StreamRequest): Observable<StreamResponse> {
    console.log(`Go through grpc MessageServiceControllerMethods..... <Stream>`)
    return this.messageService.stream(request);
  }

}