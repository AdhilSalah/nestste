import { Injectable } from '@nestjs/common';
import { MongoDBRepository } from '../mongo.service';
import { Tenant } from '../Entities/tenant.entity';

@Injectable()
export class TenantRepository extends MongoDBRepository<Tenant> {
  constructor() {
    super('tenant');
  }
}
