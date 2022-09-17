import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { PermissionsType } from 'src/shared/enums';
import { AuthzService } from './authz.service';

// Subjects is feature
type Subjects = any;

export type AppAbility = Ability<[PermissionsType, Subjects]>;

interface CaslPermission {
  action: PermissionsType;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly authzService: AuthzService) {}

  async createForUser(userId: string) {
    const user = await this.authzService.getUser(userId);
    const userPermissions = [];

    user.roles.forEach((role) => {
      role['_doc'].featurePermissions.forEach((featurePermision) => {
        featurePermision.permissions.forEach((permision) => {
          userPermissions.push({
            feature: featurePermision.feature,
            permission: permision,
          });
        });
      });
    });

    const caslPermission: CaslPermission[] = userPermissions.map(
      (permission) => ({
        action: permission.permission,
        subject: permission.feature,
      }),
    );

    return new Ability<[PermissionsType, Subjects]>(caslPermission);
  }
}
