import { Module } from '@nestjs/common';
import { LibsService } from './libs.service';
import { UserRepository } from './repositories/user.repository';
import { TenantRepository } from './repositories/tenant.repository';

@Module({
  providers: [LibsService,UserRepository,TenantRepository],
  exports: [LibsService,UserRepository,TenantRepository],
})
export class LibsModule {}
