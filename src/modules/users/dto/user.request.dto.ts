import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseRequestDto } from 'src/base/base.request.dto';

export class ListUserRequestDto extends BaseRequestDto {}
export class VerifyMailRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token?: string;
}
