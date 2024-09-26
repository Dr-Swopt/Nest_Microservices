/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BehaviorSubject, buffer, distinctUntilChanged, from, Observable, Subject } from "rxjs";
import { v4 as uuidV4 } from 'uuid';
import { WrappedMessage } from "../types";
import { sortMessageBasedOnDate } from "../utils/message-ordering";

export class BufferService {
    private currentMessageId: string | null
    private sortMessage: boolean = false
    private bufferReleaseSignal: Subject<void> = new Subject()
    private receiverConnectionState: BehaviorSubject<'OFFLINE' | 'ONLINE'> = new BehaviorSubject('OFFLINE')
    private transmissionState: BehaviorSubject<'TRANSMITTING' | 'IDLE' | 'ARRAY EMPTY' | 'STORING DATA' | 'GETTING STORED DATA'> = new BehaviorSubject('ARRAY EMPTY')
    private arrayToBeTransmitted: Subject<WrappedMessage[]> = new Subject()
    private toBeWrapped: Subject<any> = new Subject()
    private wrappedMessageToBeBuffered: Subject<WrappedMessage> = new Subject()
    private messageToBeTransmitted: Subject<WrappedMessage> = new Subject()

    // Interface
    public retransmission(payloadToBeTransmitted: Observable<any>, eventListener: Observable<any>, messageOrdering?: boolean) {
        if (messageOrdering) {
            this.sortMessage = true
            console.log(`Message ordering is set to ${this.sortMessage}`)
        }
        eventListener.subscribe(event => this.receiverConnectionState.next(event))

        this.startWrappingOperation()
        this.startBufferTransmisionProcess()
        this.releaseSignalManager()

        payloadToBeTransmitted.subscribe((message) => {
            this.toBeWrapped.next(message)
        })
    }

    public returnBufferedMessages(): Observable<WrappedMessage> {
        return this.messageToBeTransmitted.asObservable()
    }

    private startWrappingOperation() {
        this.toBeWrapped.subscribe(message => {
            this.wrappedMessageToBeBuffered.next(this.wrapMessageWithTimeReceived(message, this.currentMessageId ? this.currentMessageId : null))
        })
        //simulate connection test

        // wrappedMessageToBeBuffered will then be pushed to buffer
        this.wrappedMessageToBeBuffered.pipe(buffer(this.bufferReleaseSignal)).subscribe((bufferedMessages: WrappedMessage[]) => {
            console.log(bufferedMessages.length + ' buffered messages')
            // console.log(`Released buffered message: ${bufferedMessages.length} total messages. To Be sorted.`)
            this.arrayToBeTransmitted.next(sortMessageBasedOnDate(bufferedMessages))
            // this.arrayToBeTransmitted.next((this.sortMessage && bufferedMessages.length > 0) ? sortMessageBasedOnDate(bufferedMessages) : bufferedMessages)
        });
    }

    private wrapMessageWithTimeReceived(message: any, previousMessageID: string | null): WrappedMessage {
        // check if message has already a time received property if so no need to add anymore
        if (!message.timeReceived) {
            let WrappedMessage: WrappedMessage = {
                timeReceived: new Date(),
                payload: message,
                thisMessageID: uuidV4(),
                previousMessageID: previousMessageID
            }
            // console.log(`Current`, WrappedMessage.thisMessageID, 'Previous for this message:', WrappedMessage.previousMessageID)
            this.currentMessageId = WrappedMessage.thisMessageID
            // console.log(`Updating: `, this.currentMessageId)
            return WrappedMessage
        } else {
            return message as WrappedMessage
        }
    }

    private startBufferTransmisionProcess() {
        console.log(`StartBufferTransmissionProcess`)
        this.arrayToBeTransmitted.subscribe(array => {
            if (array.length > 0) {
                this.transmissionState.next('TRANSMITTING')
                from(array).subscribe({
                    next: (message: WrappedMessage) => {
                        if (this.receiverConnectionState.getValue() == 'OFFLINE') {
                            // buffer this message. Flush it back to buffer
                            this.wrappedMessageToBeBuffered.next(message)
                        }
                        if (this.receiverConnectionState.getValue() == 'ONLINE') {
                            // console.log(`At retransmission ${message.payload.header.messageID ?? 'undefined'}`)
                            this.messageToBeTransmitted.next(message)
                        }
                    },
                    error: err => console.error(err),
                    complete: () => {
                        // update transmission state to indicate this batch is completed
                        // console.log(`Processing buffered array completed. Changing transmission state to ARRAY EMPTY`);
                        this.transmissionState.next('ARRAY EMPTY');

                        if (this.receiverConnectionState.getValue() === 'ONLINE' && this.transmissionState.getValue() === 'ARRAY EMPTY') {
                            setTimeout(() => {
                                this.bufferReleaseSignal.next()
                            }, 1000)
                        }
                        // Do nothing if the receiver connection is offline
                    }
                });
            } else {
                // If I don't do setTimeout, then bufferrelasesignal will be overloaded
                if (this.receiverConnectionState.getValue() === 'ONLINE') {
                    setTimeout(() => {
                        this.bufferReleaseSignal.next()
                    }, 3000)
                }
            }
        }
        )
    }

    private releaseSignalManager() {
        this.receiverConnectionState.pipe(
            distinctUntilChanged()
        ).subscribe(clientState => {
            console.log(`Client is now ${clientState}`)
            if (clientState == 'OFFLINE') {
                console.log(`Current transmission state: ${this.transmissionState.getValue()}`)
                // just keep buffering
            }
            if (clientState == 'ONLINE') {
                console.log(`Current transmission state: ${this.transmissionState.getValue()}`)
                // get the stored messages to pump it back into the buffer to be ready to be processed immediately
                if (this.transmissionState.getValue() == 'ARRAY EMPTY') {
                    this.bufferReleaseSignal.next()
                }

            }
        })
    }
}
