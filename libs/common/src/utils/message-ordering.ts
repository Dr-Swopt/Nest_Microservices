/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Subject, takeWhile } from "rxjs";
import { WrappedMessage } from "../types";

export function sortMessageBasedOnDate(array: WrappedMessage[]): WrappedMessage[] {
    console.log(`Sorting ${array.length} messages....`)
    return array.sort((a, b) => {
        return new Date(a.timeReceived).getTime() - new Date(b.timeReceived).getTime();
    });
}

// Check if there's 
export async function checkPreiousAssignedMessage(message: WrappedMessage, messageChecking: Subject<WrappedMessage>): Promise<any> {
    return new Promise((resolve, reject) => {
        if (message.previousMessageID) {
            messageChecking.pipe(
                takeWhile(item => message.previousMessageID === item.thisMessageID)
            ).subscribe({
                complete: () => {
                    resolve('previousMessageID matched')
                }
            })
        } else {
            console.log('No previous messageID. This should be the first message')
            resolve('No previous message ID. Please Proceed.')
        }
    })
}