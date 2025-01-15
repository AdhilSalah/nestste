import { Module } from '@nestjs/common';
import { LibsService } from './libs.service';
import { UserRepository } from './repositories/user.repository';
import { TenantRepository } from './repositories/tenant.repository';
import { RolesRepository } from './repositories/roles.repository';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './guards/permission.guard';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true
  })],
  providers: [LibsService,UserRepository,TenantRepository,RolesRepository,
        {
      provide:APP_GUARD,
      useClass:PermissionsGuard
    },
  ],
  exports: [LibsService,UserRepository,TenantRepository,RolesRepository,
    // {
    //   provide:APP_GUARD,
    //   useClass:PermissionsGuard
    // }
  ],
})
export class LibsModule {}
