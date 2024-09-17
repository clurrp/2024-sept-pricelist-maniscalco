import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvWriterModule } from 'src/csv-writer/csv-writer.module';
import { ReaderModule } from 'src/reader/reader.module';
import { PricelistModule } from 'src/pricelist/pricelist.module';

@Module({
  imports: [CsvWriterModule, ReaderModule, PricelistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
