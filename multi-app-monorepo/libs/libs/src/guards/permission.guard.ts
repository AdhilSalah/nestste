export enum Permissions {
    READ_USER = 'user.read',
    UPDATE_USER = 'update.user',
    CREATE_USER = 'create.user',
}

export const permissions = [
    'user.read',
    'update.user',
    'create.user',
]


import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_METEDATA_KEY } from './permission.decorator';
import { RolesRepository } from '../repositories/roles.repository';
import { UserRepository } from '../repositories/user.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private refector: Reflector,
    private readonly rolesRepo:RolesRepository,
    private userrepo:UserRepository
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredClientPermissions = this.refector.getAllAndOverride<
      Permissions| undefined
    >(PERMISSIONS_METEDATA_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredClientPermissions || requiredClientPermissions.length === 0) {
      return true;
    }
    console.log(requiredClientPermissions);
    
    // const req = context.switchToHttp().getRequest();
    // //console.log(req.query.id);
    const userPermissions = ['user.read','user.update'];
    const val = userPermissions.includes(requiredClientPermissions);
    // console.log(val);
    return  userPermissions.includes(requiredClientPermissions);

  };
}