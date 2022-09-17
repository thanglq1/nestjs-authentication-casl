import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcryptjs';
import { expiredIn, jwtSecret } from 'src/constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUser: IUser) {
    const user = await this.userService.createUser(createUser);
    const accessToken = this.generateToken(user.username, user._id, user.email);

    user['_doc'].accessToken = accessToken;

    delete user['_doc'].password;

    return user;
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

    const accessToken = this.generateToken(user.username, user._id, user.email);

    user['_doc'].accessToken = accessToken;

    delete user['_doc'].password;

    return user;
  }

  generateToken(username: string, userId: string, email: string) {
    return this.jwtService.sign(
      {
        username: username,
        sub: userId,
        email: email,
      },
      {
        secret: jwtSecret,
        expiresIn: expiredIn,
      },
    );
  }
}
