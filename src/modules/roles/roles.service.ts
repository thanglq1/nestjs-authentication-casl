import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ListRoleRequestDto } from './dto/role.request.dto';
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(role: CreateRoleDto) {
    return await this.roleRepository.create(role);
  }

  async getRoles(roleRequestDto: ListRoleRequestDto) {
    return await this.roleRepository.find(roleRequestDto, {}, {}, [
      { path: 'users' },
    ]);
  }

  async getRole(roleId: string) {
    return await this.roleRepository.findById(roleId, {}, {}, [
      { path: 'users' },
    ]);
  }

  async updateRole(roleId: string, role: UpdateRoleDto) {
    return await this.roleRepository.findByIdAndUpdate(roleId, role);
  }

  async deleteRole(roleId: string) {
    return await this.roleRepository.findByIdAndDelete(roleId);
  }

  async updateUserToRole(roleId: string, userId: string) {
    return await this.roleRepository.findByIdAndUpdate(roleId, {
      $push: { users: userId },
    });
  }
}
