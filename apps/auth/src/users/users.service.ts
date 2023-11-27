import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
  Empty,
} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject, from } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private logger = new Logger(`UserService`)
  private readonly users: User[] = [];

  constructor() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    }
  }

  onModuleInit() {
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): Users {
    this.logger.log(`Returning all Users to client`)
    return { users: this.users };
  }

  findOne(id: string): User {
    this.logger.log(`Returning ${id} to client`)
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    this.logger.log(`Updating ${id} for client`)
    console.log(updateUserDto);
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  remove(id: string) {
    this.logger.log(`Removing ${id} for client`)
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    this.logger.log(`Streaming more users info/page for client`)
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  streaming(request: Empty): Observable<User> {
    let resultObs: Observable<User> = from(this.users)
    return resultObs
  }
}