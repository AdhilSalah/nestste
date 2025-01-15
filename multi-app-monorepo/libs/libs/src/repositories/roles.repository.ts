import { Injectable } from '@nestjs/common';
import {Repository } from './base/dynamicrepo.repostiory'
import { Roles } from '../Entities/roles.entity';

@Injectable()
export class RolesRepository extends Repository<Roles> {
  constructor() {
    super('roles');
  }

}
