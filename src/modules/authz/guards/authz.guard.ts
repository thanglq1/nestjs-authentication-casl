import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CHECK_PERMSSION_KEY,
  RequiredPermission,
} from 'src/decorators/check.permission.decorator';
import { CaslAbilityFactory } from '../casl-ability.factory';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        CHECK_PERMSSION_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const ability = await this.abilityFactory.createForUser(user.sub);

    return requiredPermissions.every((permission) =>
      ability.can(...permission),
    );
  }
}
