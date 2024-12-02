import { Test, TestingModule } from '@nestjs/testing';
import { TestMailController } from './test-mail.controller';

describe('TestMailController', () => {
  let controller: TestMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestMailController],
    }).compile();

    controller = module.get<TestMailController>(TestMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
