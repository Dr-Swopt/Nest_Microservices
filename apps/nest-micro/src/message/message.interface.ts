import { Observable } from 'rxjs';
export interface StreamRequest {
    id: string,
    message: any
}

export interface StreamResponse {
    id: string,
    message: any
}


export interface MessageServiceClient {
    stream(request: StreamRequest): Observable<StreamResponse>;
}
