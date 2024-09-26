export interface Message {
    id: string;
    payload: any;
}

export interface ConnectionState {
    uuid?: string | number;
    status: 'BUFFER' | 'DIRECT_PUBLISH' | 'LIMIT_EXCEEDED' ,
    reason?: string;
    payload?: any;
}


export interface WrappedMessage {
    timeReceived: any, // this property is for sender to sort
    payload: any,
    thisMessageID?: string,
    previousMessageID?: string // this property is for receiver to sort
}