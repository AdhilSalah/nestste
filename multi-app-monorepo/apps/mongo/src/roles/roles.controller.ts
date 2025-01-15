import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Roles } from "@app/libs/Entities/roles.entity";
import { Permissions } from "@app/libs/guards/permission.guard";

@Controller('roles')
export class RolesController {
  constructor(private readonly userRepository: RolesService) {}

// Create a new user
  @Post()
  async createUser(@Body() user: Roles): Promise<any> {
    return await this.userRepository.create(user);
  }
  // Get all users or filter by query params
  @Get()
  async getUsers(): Promise<Roles[]> {
    return await this.userRepository.getAll();
  }
 @Get('permissions')
  async getPermissions():Promise<String[]>{
   return this.userRepository.getPermissions();
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Roles | null> {
    return await this.userRepository.getById(id );
  }

@Put(':id')
  async Edit(
    @Body() user: any,
    @Param('id') id: string): Promise<Roles | null> {
    return await this.userRepository.update(id,user);
  }

}