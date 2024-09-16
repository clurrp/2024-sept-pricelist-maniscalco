import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvReaderModule } from '../csv-reader/csv-reader.module';

@Module({
  imports: [CsvReaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
