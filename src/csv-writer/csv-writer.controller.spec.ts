import { Test, TestingModule } from '@nestjs/testing';
import { CsvWriterController } from './csv-writer.controller';
import { CsvWriterService } from './csv-writer.service';

describe('CsvWriterController', () => {
  let controller: CsvWriterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvWriterController],
      providers: [CsvWriterService],
    }).compile();

    controller = module.get<CsvWriterController>(CsvWriterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
