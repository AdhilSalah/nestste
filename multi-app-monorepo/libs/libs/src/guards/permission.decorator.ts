
import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permission.guard';

export const PERMISSIONS_METEDATA_KEY = 'permissions_decorator_key';

export const Permissionsi = (permissions) =>
  SetMetadata(PERMISSIONS_METEDATA_KEY, permissions);
