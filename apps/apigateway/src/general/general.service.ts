import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
    CreateUserDto,
    Empty,
    MESSAGE_SERVICE_NAME,
    MessageServiceClient,
    PaginationDto,
    StreamRequest,
    StreamResponse,
    USERS_SERVICE_NAME,
    UpdateUserDto,
    UsersServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { AUTH_SERVICE, MESSAGE_SERVICE } from './constant';

@Injectable()
export class GeneralService implements OnModuleInit {
    private Logger = new Logger(`GeneralService`)
    private usersService: UsersServiceClient;
    private messageService: MessageServiceClient;

    constructor(@Inject(AUTH_SERVICE) private authClient: ClientGrpc, @Inject(MESSAGE_SERVICE) private messageClient: ClientGrpc) { }

    onModuleInit() {
        this.usersService = this.authClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
        this.messageService = this.messageClient.getService<MessageServiceClient>(MESSAGE_SERVICE_NAME);
    }

    stream(streamRequest: StreamRequest): Observable<StreamResponse> {
        this.Logger.log(`Calling Microservice GRPC tp stream ${streamRequest.message}`)
        let res: Observable<StreamResponse> = this.messageService.stream(streamRequest)
        res.subscribe(e => this.Logger.log(e))
        return res
    }

    create(createUserDto: CreateUserDto) {
        this.Logger.log(`Calling Microservice Auth to create ${createUserDto.username}...`)
        return this.usersService.createUser(createUserDto);
    }

    findAll() {
        this.Logger.log(`Calling Microservice Auth to return all users...`)
        return this.usersService.findAllUsers({});
    }

    findOne(id: string) {
        this.Logger.log(`Calling Microservice Auth to return user ${id}...`)
        return this.usersService.findOneUser({ id });
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        this.Logger.log(`Calling Microservice Auth to update user ${id}...`)
        return this.usersService.updateUser({ id, ...updateUserDto });
    }

    remove(id: string) {
        this.Logger.log(`Calling Microservice Auth to delete user ${id}...`)
        return this.usersService.removeUser({ id });
    }

    emailUsers() {
        this.Logger.log(`Calling Microservice Auth to email users...`)
        const users$ = new ReplaySubject<PaginationDto>();

        users$.next({ page: 0, skip: 25 });
        users$.next({ page: 1, skip: 25 });
        users$.next({ page: 2, skip: 25 });
        users$.next({ page: 3, skip: 25 });

        users$.complete();

        let chunkNumber = 1;

        this.usersService.queryUsers(users$).subscribe((users) => {
            this.Logger.log('Chunk', chunkNumber, users);
            chunkNumber += 1;
        });
    }

    streaming(request: Empty) {
        this.Logger.log(`Calling Microservice Auth to stream users...`)
        this.usersService.streaming(request).subscribe(e => this.Logger.log(e))
    }
}