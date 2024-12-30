import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { User } from '@app/libs/Entities/user.entity';
import { Tenant } from '@app/libs/Entities/tenant.entity';

@Controller('users')
export class MongoController {
  constructor(private readonly userRepository: MongoService) {}

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
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  // Get a specific user by ID
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id );
  }

  // Update a user's information
  // @Put(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() updateData: Partial<User>,
  // ): Promise<any> {
  //   return await this.userRepository.update({ id }, updateData);
  // }

  // // Delete a user
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<any> {
  //   return await this.userRepository.delete({ id });
  // }
}
