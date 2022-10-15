import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ListUserRequestDto,
  VerifyMailRequestDto,
} from './dto/user.request.dto';
import { AssignRoleToUserDto, UpdateUserDto } from './dto/user.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: ListUserRequestDto) {
    return this.usersService.getUsers(query);
  }

  @Get(':id([0-9a-f]{24})')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put(':id([0-9a-f]{24})')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':id[0-9a-z]{24}')
  deleteUser(@Param() userId: string) {
    return this.usersService.deleteUser(userId);
  }

  @Put('assignRoleToUser')
  assignRoleToUser(@Body() assignRoleToUserDto: AssignRoleToUserDto) {
    return this.usersService.assignRoleToUser(
      assignRoleToUserDto.roleId,
      assignRoleToUserDto.userId,
    );
  }

  @Put('verifyMail')
  @Public()
  verifyMail(@Body() bodyRequest: VerifyMailRequestDto) {
    return this.usersService.verifyEmail(bodyRequest.token);
  }
}
