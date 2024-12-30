import { Controller, Get } from '@nestjs/common';
import { SqlService } from './sql.service';

@Controller()
export class SqlController {
  constructor(private readonly sqlService: SqlService) {}

  @Get()
  getHello(): string {
    return this.sqlService.getHello();
  }
}
