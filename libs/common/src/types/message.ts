/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const messageProtobufPackage = "message";

export interface StreamRequest {
    id: string;
    message: string;
}

export interface StreamResponse {
    id: string;
    message: string;
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
        const grpcMethods: string[] = ["stream"];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
        }
        // const grpcStreamMethods: string[] = ["stream"];
        // for (const method of grpcStreamMethods) {
        //     const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
        //     GrpcStreamMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
        // }
    };
}

export const MESSAGE_SERVICE_NAME = "MessageService";