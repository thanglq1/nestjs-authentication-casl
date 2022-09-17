import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';

import { ApiTags } from '@nestjs/swagger';
import {
  AssignFeaturePermissionToRole,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto/role.dto';
import { ListRoleRequestDto } from './dto/role.request.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  getRoles(@Query() roleRequestDto: ListRoleRequestDto) {
    return this.rolesService.getRoles(roleRequestDto);
  }

  @Get(':id[0-9a-z]{24}')
  getRole(@Param('id') roleId: string) {
    return this.rolesService.getRole(roleId);
  }

  @Put(':id[0-9a-z]{24}')
  updateRole(
    @Param('id') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(roleId, updateRoleDto);
  }

  @Delete(':id[0-9a-z]{24}')
  deleteRole(@Param('id') roleId: string) {
    return this.rolesService.deleteRole(roleId);
  }

  @Put(':id/assignFeaturePermissionToRole')
  assignFeaturePermissionToRole(
    @Param('id') roleId: string,
    @Body() assignFeaturePermissionToRole: AssignFeaturePermissionToRole,
  ) {
    return this.rolesService.assignFeaturePermissionToRole(
      roleId,
      assignFeaturePermissionToRole,
    );
  }
}
