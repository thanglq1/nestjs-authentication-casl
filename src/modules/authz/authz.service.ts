import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthzService {
  constructor(private readonly userService: UsersService) {}

  async getUser(userId: string) {
    return await this.userService.getUserById(userId);
  }
}
