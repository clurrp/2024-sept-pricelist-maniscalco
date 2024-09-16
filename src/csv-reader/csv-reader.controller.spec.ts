import { Test, TestingModule } from '@nestjs/testing';
import { CsvReaderController } from './csv-reader.controller';
import { CsvReaderService } from './csv-reader.service';

describe('CsvReaderController', () => {
  let controller: CsvReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvReaderController],
      providers: [CsvReaderService],
    }).compile();

    controller = module.get<CsvReaderController>(CsvReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
