import { Roles } from '@app/libs/Entities/roles.entity';
import { Tenant } from '@app/libs/Entities/tenant.entity';
import { User } from '@app/libs/Entities/user.entity';
import { permissions } from '@app/libs/guards/permission.guard';
import { RolesRepository } from '@app/libs/repositories/roles.repository';
import { TenantRepository } from '@app/libs/repositories/tenant.repository';
import { UserRepository } from '@app/libs/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository,
  ) {}

  async create(data: Roles) {
    return this.rolesRepository.create(data);
  }
  async getAll() {
    const user = await this.rolesRepository.find({});
    return user
  }

  async getById(id: string) {
    return this.rolesRepository.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, updateData: any) {
    return this.rolesRepository.update({ _id: new ObjectId(id) }, updateData);
  }

  async delete(id: string) {
    return this.rolesRepository.delete({ _id: new ObjectId(id) });
  }

  async getPermissions(){
    return permissions
  }
}

