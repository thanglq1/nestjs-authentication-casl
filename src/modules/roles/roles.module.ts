import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './roles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName, RoleSchema } from './schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelName, schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RolesService],
})
export class RolesModule {}
