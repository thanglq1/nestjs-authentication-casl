import { IRole } from './interfaces/role.interface';
import { Document } from 'mongoose';

export interface RoleModel extends IRole, Document {}
