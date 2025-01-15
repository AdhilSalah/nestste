import { Module } from '@nestjs/common';
import { MongoController } from './user.controller';

import { LibsModule } from '@app/libs';
import { UserRepository } from '@app/libs/repositories/user.repository';
import { RolesService } from './roles/roles.service';
import { UserService } from './user.service';
import { RolesController } from './roles/roles.controller';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from '@app/libs/guards/permission.guard';

@Module({
  imports: [LibsModule],
  controllers: [MongoController,RolesController],
  providers: [UserService,RolesService,
        {
          provide:APP_GUARD,
          useClass:PermissionsGuard
        }
  ]
})
export class MongoModule {}
