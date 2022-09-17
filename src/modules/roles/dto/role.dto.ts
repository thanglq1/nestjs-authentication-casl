import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateFeaturePermissionDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  feature: string;

  @ApiProperty()
  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  permissions: string[];
}

export class UpdateFeaturePermissionDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  feature: string;

  @ApiProperty()
  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  permissions: string[];
}

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

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateFeaturePermissionDto)
  featurePermissions: UpdateFeaturePermissionDto[];
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

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateFeaturePermissionDto)
  featurePermissions: UpdateFeaturePermissionDto[];
}

export class AssignFeaturePermissionToRole {
  @ApiProperty()
  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateFeaturePermissionDto)
  featurePermissions: CreateFeaturePermissionDto[];
}
