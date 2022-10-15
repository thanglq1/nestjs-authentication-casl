export interface IUser {
  username: string;
  email: string;
  password: string;
  roles?: string[];
  isActive?: boolean;
  isDeleted?: boolean;
}
