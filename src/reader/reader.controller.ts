import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Controller('reader')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}
  @Get()
  async findAll() {
    return await this.readerService.parseData();
  }
}
