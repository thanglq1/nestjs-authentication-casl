import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron } from '@nestjs/schedule';
import { jwtSecret } from 'src/shared/constant';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ListUserRequestDto } from './dto/user.request.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  @Cron('01 20-22 * * *', {
    utcOffset: 7,
  })
  testCron() {
    console.log('date:::', new Date());
    console.log('date-timestamp:::', Date.now());
  }

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

  async verifyEmail(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: jwtSecret,
      });

      const email = payload.email;
      const user = await this.findOneUser({ email });

      if (user && user.isActive) {
        throw new BadRequestException('Email already confirmed');
      }

      await this.updateUser(user._id, {
        isActive: true,
      });
    } catch (error) {
      console.log('VerifyEmail Error:::', error);
    }
  }
}
