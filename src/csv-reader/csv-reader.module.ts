import { Module } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';
import { CsvReaderController } from './csv-reader.controller';

@Module({
  controllers: [CsvReaderController],
  providers: [CsvReaderService],
})
export class CsvReaderModule {}
