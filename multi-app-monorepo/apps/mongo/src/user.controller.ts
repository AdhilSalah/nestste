import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import {UserService } from './user.service';
import { User } from '@app/libs/Entities/user.entity';
import { Tenant } from '@app/libs/Entities/tenant.entity';
import { RolesService } from './roles/roles.service';
import { Roles } from '@app/libs/Entities/roles.entity';
import { Permissions, PermissionsGuard } from '@app/libs/guards/permission.guard';
import { Permissionsi } from '@app/libs/guards/permission.decorator';

@Controller('users')
export class MongoController {
  constructor(private readonly userRepository: UserService) {}

  // Create a new user
  @Post()
  async createUser(@Body() user: User): Promise<any> {
    return await this.userRepository.createUser(user);
  }

  @Post('tenant')
  async createTenant(@Body() tenant: Tenant): Promise<any> {
    return await this.userRepository.createTenant(tenant);
  }

  // Get all users or filter by query params
  @Get()
  @Permissionsi(Permissions.READ_USER)
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  // Get a specific user by ID
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id );
  }

  @Put(':id')
  async edit(
    @Body() user: User,
    @Param('id') id: string): Promise<User | null> {
    return await this.userRepository.updateUser(id,user );
  }
}

