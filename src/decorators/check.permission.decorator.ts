import { SetMetadata } from '@nestjs/common';
import { FeaturesType, PermissionsType } from 'src/shared/enums';

export const CHECK_PERMSSION_KEY = 'checkPermissionKey';

export type RequiredPermission = [PermissionsType, FeaturesType];

export const CheckPermission = (...params: RequiredPermission[]) =>
  SetMetadata(CHECK_PERMSSION_KEY, params);
