import { Injectable } from '@nestjs/common';
import { MongoDBRepository } from './base/mongo.repository';
import {Repository } from './base/dynamicrepo.repostiory';
import { User } from '../Entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor() {
    super('users');
  }

}
