import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcryptjs';
import { expiredIn, jwtSecret } from 'src/shared/constant';
import { OAuth2Client } from 'google-auth-library';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signup(createUser: IUser) {
    const user = await this.userService.createUser(createUser);
    const accessToken = this.generateToken(user.username, user._id, user.email);

    user['_doc'].accessToken = accessToken;

    delete user['_doc'].password;

    //  Send verify mail
    const url = `http://localhost:3000/confirm/mail?token=${accessToken}`;
    this.mailService.sendVerifyEmail(
      createUser.email,
      createUser.username,
      url,
    );

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findOneUser({
      email,
      isActive: true,
      isDeleted: false,
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

  async googleSignin(token: string) {
    const clientId =
      '388861891893-rc5gno6dagli3b2nkb8gn3rvo9c10atm.apps.googleusercontent.com';
    try {
      const oAuth2Client = await new OAuth2Client(clientId);
      const tokenInfo = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      if (tokenInfo) {
        const email = tokenInfo.getPayload().email;
        const username = tokenInfo.getPayload().name;
        const picture = tokenInfo.getPayload().picture;

        const user = await this.userService.findOneUser({ email });
        // if (!user) {
        //   // TODO: User not exist. We can create new user or throw error user does not exist
        // }
        // return user;
      }
      return tokenInfo;
    } catch (error) {
      console.log(error);
      return error;
    }
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
