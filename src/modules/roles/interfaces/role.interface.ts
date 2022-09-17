export interface IRole {
  name: string;
  description: string;
  users: string[];
  featurePermissions: IFeaturePermission[];
}

export interface IFeaturePermission {
  feature: string;
  permissions: string[];
}
