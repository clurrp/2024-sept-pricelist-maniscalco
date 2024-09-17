import { Module } from '@nestjs/common';
import { CsvWriterService } from './csv-writer.service';
import { CsvWriterController } from './csv-writer.controller';

@Module({
  controllers: [CsvWriterController],
  providers: [CsvWriterService],
  exports: [CsvWriterService],
})
export class CsvWriterModule {}
