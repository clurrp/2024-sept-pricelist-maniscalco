import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';
import { CreateCsvReaderDto } from './dto/create-csv-reader.dto';
import { UpdateCsvReaderDto } from './dto/update-csv-reader.dto';

@Controller('csv-reader')
export class CsvReaderController {
  constructor(private readonly csvReaderService: CsvReaderService) {}

  @Get('read')
  async readCsvFile() {
    const filePath = '2024-maniscalco-spreadsheet.xlsx'; // Update with your CSV file path
    const filePathOutput = '2024-maniscalco-spreadsheet-output.xlsx'; // Update with your CSV file path

    const data = await this.csvReaderService.readCsv(filePath);
    console.log({ data });
  
    const message = await this.csvReaderService.writeXlsx(filePathOutput, data);
    console.log({ message });

    // return data[0];
  }


  @Get()
  findAll() {
    return this.csvReaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.csvReaderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCsvReaderDto: UpdateCsvReaderDto) {
    return this.csvReaderService.update(+id, updateCsvReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.csvReaderService.remove(+id);
  }
}
