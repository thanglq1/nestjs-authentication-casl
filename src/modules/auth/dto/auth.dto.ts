import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TokenVerifyDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  token: string;
}
