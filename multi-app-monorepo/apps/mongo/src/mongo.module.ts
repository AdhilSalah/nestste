import { Module } from '@nestjs/common';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';
import { LibsModule } from '@app/libs';
import { UserRepository } from '@app/libs/repositories/user.repository';

@Module({
  imports: [LibsModule],
  controllers: [MongoController],
  providers: [MongoService]
})
export class MongoModule {}
