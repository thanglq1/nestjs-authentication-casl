import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListUserDto } from './dto/query-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: ListUserDto) {
    return this.usersService.getUsers(query);
  }

  @Get(':id([0-9a-f]{24})')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }
}
