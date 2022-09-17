import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { RoleModel } from './roles.model';
import { ModelName } from './schemas/role.schema';

@Injectable()
export class RoleRepository extends BaseRepository<RoleModel> {
  constructor(@InjectModel(ModelName) model) {
    super(model);
  }
}
