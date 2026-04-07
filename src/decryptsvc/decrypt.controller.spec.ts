import { Test, TestingModule } from '@nestjs/testing';
import { DecryptController } from './decrypt.controller';

describe('DecryptController', () => {
  let controller: DecryptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecryptController],
    }).compile();

    controller = module.get<DecryptController>(DecryptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
