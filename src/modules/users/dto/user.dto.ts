import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;
}

export class SigninUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}

export class AssignRoleToUserDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  roleId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
