import { Tenant } from '@app/libs/Entities/tenant.entity';
import { User } from '@app/libs/Entities/user.entity';
import { TenantRepository } from '@app/libs/repositories/tenant.repository';
import { UserRepository } from '@app/libs/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoService {
  constructor(private readonly userRepository: UserRepository,
    private readonly tenantRepository: TenantRepository, 
  ) {}

  async createUser(data: User) {
    return this.userRepository.create(data);
  }

    async createTenant(data: Tenant) {
    return this.tenantRepository.create(data);
  }

  async getAllUsers() {
    return this.userRepository.find({});
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ _id: id });
  }

  async updateUser(id: string, updateData: any) {
    return this.userRepository.update({ _id: id }, updateData);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ _id: id });
  }
}

