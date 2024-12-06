import { SetMetadata } from '@nestjs/common';
import { validRoles } from '../interfaces';
export const META_ROLES = 'roles';
export const RoleProtected = (...args: validRoles[]) => SetMetadata(META_ROLES, args);
