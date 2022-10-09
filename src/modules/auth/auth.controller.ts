import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SigninUserDto } from '../users/dto/user.dto';
import { TokenVerifyDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Get('signin')
  @Public()
  signin(@Query() query: SigninUserDto) {
    return this.authService.signin(query.email, query.password);
  }

  @Post('googleSignin')
  @Public()
  googleSignin(@Body() tokenData: TokenVerifyDto) {
    return this.authService.googleSignin(tokenData.token);
  }
}
