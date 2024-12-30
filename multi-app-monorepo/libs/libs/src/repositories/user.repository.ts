import { Injectable } from '@nestjs/common';
import { MongoDBRepository } from '../mongo.service';
import { User } from '../Entities/user.entity';

@Injectable()
export class UserRepository extends MongoDBRepository<User> {
  constructor() {
    super('users');
  }
}
