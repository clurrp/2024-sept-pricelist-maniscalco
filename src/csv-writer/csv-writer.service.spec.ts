import { Test, TestingModule } from '@nestjs/testing';
import { CsvWriterService } from './csv-writer.service';

describe('CsvWriterService', () => {
  let service: CsvWriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvWriterService],
    }).compile();

    service = module.get<CsvWriterService>(CsvWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
