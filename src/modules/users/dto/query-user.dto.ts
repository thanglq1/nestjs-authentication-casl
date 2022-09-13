import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListUserDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  perPage: number;
}
