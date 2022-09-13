import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcryptjs';
import { jwtSecret } from 'src/constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: IUser) {
    return this.userService.createUser(user);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findOneUser({
      email,
    });

    if (!user) throw new NotFoundException(`Not found user ${email}`);

    const checkCorrectPassword = bycrypt.compareSync(password, user.password);

    if (!checkCorrectPassword) {
      throw new BadRequestException(`Your email or password are incorrect`);
    }

    const accessToken = this.jwtService.sign(
      {
        username: user.username,
        sub: user.id,
        email: user.email,
      },
      {
        secret: jwtSecret,
        expiresIn: '60s',
      },
    );

    user['_doc'].accessToken = accessToken;

    delete user['_doc'].password;

    return user;
  }
}
