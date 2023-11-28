/* eslint-disable */
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const messageProtobufPackage = "message";

export interface Check {
    message: string
}
export interface StreamRequest {
    id: string;
    message: string;
}

export interface StreamResponse {
    id: string;
    message: string;
}

export interface MessageLog {
    appLogLocId: string,
    appData: {
        msgId: string,
        msgLogDateTime: string,
        msgDateTime: string, 
        msgTag: string[],
        msgPayload: string
    }
}

export const MESSAGE_PACKAGE_NAME = "message";

export interface MessageServiceClient {
    check(check: Check): Observable<Check>
    stream(request: StreamRequest): Observable<StreamResponse>;
}

export interface MessageServiceController {
    check(check: Check): Promise<Check> | Observable<Check> | Check;
    stream(request: StreamRequest): Observable<StreamResponse>;
}

export function MessageServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = ["stream", "check"];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const MESSAGE_SERVICE_NAME = "MessageService";