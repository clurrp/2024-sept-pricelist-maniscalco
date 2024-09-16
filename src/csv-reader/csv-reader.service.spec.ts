import { Test, TestingModule } from '@nestjs/testing';
import { CsvReaderService } from './csv-reader.service';

describe('CsvReaderService', () => {
  let service: CsvReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvReaderService],
    }).compile();

    service = module.get<CsvReaderService>(CsvReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
