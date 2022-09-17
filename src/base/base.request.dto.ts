import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class BaseRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  perPage: number;
}
