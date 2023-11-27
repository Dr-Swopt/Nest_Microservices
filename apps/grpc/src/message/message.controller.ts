import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageServiceController, MessageServiceControllerMethods, StreamRequest, StreamResponse } from '@app/common';

@Controller()
@MessageServiceControllerMethods()
export class MessageController implements MessageServiceController {
  constructor(private messageService: MessageService) { }

  stream(request: StreamRequest): Observable<StreamResponse> {
    return this.messageService.stream(request);
  }
}

