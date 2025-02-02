import { Module } from '@nestjs/common';
import { SqlController } from './sql.controller';
import { SqlService } from './sql.service';

@Module({
  imports: [],
  controllers: [SqlController],
  providers: [SqlService],
})
export class SqlModule {}
