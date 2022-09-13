import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsEmail } from 'class-validator';

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
