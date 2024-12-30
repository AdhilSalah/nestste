import { Test, TestingModule } from '@nestjs/testing';
import { SqlController } from './sql.controller';
import { SqlService } from './sql.service';

describe('SqlController', () => {
  let sqlController: SqlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SqlController],
      providers: [SqlService],
    }).compile();

    sqlController = app.get<SqlController>(SqlController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sqlController.getHello()).toBe('Hello World!');
    });
  });
});
