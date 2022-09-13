import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

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
}
