import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ListUserRequestDto } from './dto/user.request.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.repository.create(createUserDto);
  }

  async getUsers(queryUsersDto: ListUserRequestDto) {
    return await this.repository.find(queryUsersDto, {}, {}, [
      { path: 'roles' },
    ]);
  }

  async getUserById(userId: string) {
    return await this.repository.findById(userId, {}, {}, [{ path: 'roles' }]);
  }

  async findOneUser(query: object) {
    return await this.repository.findOne(query, {}, [{ path: 'roles' }]);
  }

  async updateUser(userId: string, updateUser: UpdateUserDto) {
    return await this.repository.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
  }

  async deleteUser(userId: string) {
    return await this.repository.findByIdAndDelete(userId);
  }

  async assignRoleToUser(roleId: string, userId: string) {
    // Update role
    this.rolesService.updateUserToRole(roleId, userId);

    // Update user
    return await this.repository.findByIdAndUpdate(
      userId,
      { $push: { roles: roleId } },
      { new: true },
    );
  }
}
