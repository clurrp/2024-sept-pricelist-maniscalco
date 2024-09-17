import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { ReaderModule } from 'src/reader/reader.module';
import { CsvWriterModule } from 'src/csv-writer/csv-writer.module';

@Module({
  imports: [ReaderModule, CsvWriterModule],
  controllers: [PricelistController],
  providers: [PricelistService],
})
export class PricelistModule {}
