import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthzService } from './authz.service';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [UsersModule],
  providers: [AuthzService, CaslAbilityFactory],
  exports: [AuthzService, CaslAbilityFactory],
})
export class AuthzModule {}
