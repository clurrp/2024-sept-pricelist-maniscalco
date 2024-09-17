import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { CreatePricelistDto } from './dto/create-pricelist.dto';
import { UpdatePricelistDto } from './dto/update-pricelist.dto';
import { ReaderService } from 'src/reader/reader.service';
import { CsvWriterService } from 'src/csv-writer/csv-writer.service';

@Controller('pricelist')
export class PricelistController {
  constructor(
    private readonly pricelistService: PricelistService,
    private readonly readerService: ReaderService,
    private readonly writeService: CsvWriterService,
  ) {}

  @Get()
  async findAll() {
    const readData = await this.readerService.parseData();
    const writeData = await this.writeService.writePriceLevelA(readData);
    console.log('Read and write data :)');
  }
}
