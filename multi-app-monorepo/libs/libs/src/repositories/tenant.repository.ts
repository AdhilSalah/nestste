import { Injectable } from '@nestjs/common';
import { MongoDBRepository } from './base/mongo.repository';
import { Tenant } from '../Entities/tenant.entity';
import { Repository } from './base/dynamicrepo.repostiory';

@Injectable()
export class TenantRepository extends Repository<Tenant> {
  constructor() {
    super('tenant');
  }
}
