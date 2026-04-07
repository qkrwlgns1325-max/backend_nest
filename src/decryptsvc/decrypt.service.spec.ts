import { Test, TestingModule } from '@nestjs/testing';
import { DecryptService } from './decrypt.service';

describe('DecryptService', () => {
  let service: DecryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecryptService],
    }).compile();

    service = module.get<DecryptService>(DecryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
