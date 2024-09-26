/*  This Message constants and interfaces and function are mostly for GRPC microservice */
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const messageProtobufPackage = "message";

export interface Request {
    id: string;
    message: string;
}

export interface Response {
    id: string;
    message: string;
}

export const MESSAGE_PACKAGE_NAME = "message";

export interface MessageServiceClient {
    returnResponse(request): Response
    returnStreamResponse(request: Request): Observable<Response>;
    bidirectionalStream(request: Observable<Request>): Observable<Response>
}

export interface GrpcMessageServiceController {
    returnResponse(request): Response
    returnStreamResponse(request: Request): Observable<Response>;
    bidirectionalStream(request: Observable<Request>): Observable<Response>
}

export function GrpcMessageServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = ["returnResponse", "returnStreamResponse", "bidirectionalStream"];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod("GrpcMessageService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const MESSAGE_SERVICE_NAME = "GrpcMessageService";