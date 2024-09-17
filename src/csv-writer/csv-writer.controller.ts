import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CsvWriterService } from './csv-writer.service';
import { CreateCsvWriterDto } from './dto/create-csv-writer.dto';
import { UpdateCsvWriterDto } from './dto/update-csv-writer.dto';

@Controller('csv-writer')
export class CsvWriterController {
  constructor(private readonly csvWriterService: CsvWriterService) {}

  // @Post()
  // async writeCsv() {
  //   return await this.csvWriterService.writeCsv();
  // }
}
