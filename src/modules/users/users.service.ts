import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/query-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.repository.createUser(createUserDto);
  }

  async getUsers(queryUsersDto: ListUserDto) {
    return await this.repository.findUsers(queryUsersDto);
  }

  async getUserById(userId: string) {
    return await this.repository.findUserById(userId);
  }

  async findOneUser(query: object) {
    return await this.repository.findOneUser(query);
  }
}
