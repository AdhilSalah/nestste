import { Tenant } from '@app/libs/Entities/tenant.entity';
import { User } from '@app/libs/Entities/user.entity';
import { TenantRepository } from '@app/libs/repositories/tenant.repository';
import { UserRepository } from '@app/libs/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
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
    const user = await this.userRepository.find({});
    //console.log(user[0].roles[0]);
    return user
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ _id: new ObjectId(id) });
  }

  async updateUser(id: string, updateData: any) {
    return this.userRepository.update({ _id: new ObjectId(id) }, updateData);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ _id: new ObjectId(id) });
  }
}

