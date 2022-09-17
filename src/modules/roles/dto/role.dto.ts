import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
