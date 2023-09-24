import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('healthCheck', () => {
    it('should return "success and the version"', () => {
      expect(appController.healthCheck()).toStrictEqual({
        success: true,
        version: '0.0.1',
      });
    });
  });
});
