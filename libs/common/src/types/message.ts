/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const messageProtobufPackage = "message";

export interface StreamRequest {
    id: string;
    messsage: string;
}

export interface StreamResponse {
    id: string;
    messsage: string;
}

export const MESSAGE_PACKAGE_NAME = "message";

export interface MessageServiceClient {
    stream(request: StreamRequest): Observable<StreamResponse>;
}

export interface MessageServiceController {
    stream(request: StreamRequest): Observable<StreamResponse>;
}

export function MessageServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcStreamMethods: string[] = ["Stream"];
        for (const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const MESSAGE_SERVICE_NAME = "MessageService";