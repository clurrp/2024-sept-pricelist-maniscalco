import { Injectable } from '@nestjs/common';
import { CreateCsvReaderDto } from './dto/create-csv-reader.dto';
import { UpdateCsvReaderDto } from './dto/update-csv-reader.dto';
import * as path from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

@Injectable()
export class CsvReaderService {
  private data: any[] = [];

  // https://blog.tericcabrel.com/read-csv-node-typescript/
  async readCsv(filePath: string): Promise<any> {
    console.log({ filePath });
    const fileBuffer = fs.readFileSync(path.resolve(filePath));
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    this.data = XLSX.utils.sheet_to_json(worksheet);
    console.log({ megan: this.data[0] });

    const results = this.data.filter(item => item['SERIES NAME'] === 'Victoria Metals');
    // const results = this.data.filter((item) => item['SKU #'] === 'A16052');

    console.log({ results });
    return results;
  }

  async writeXlsx(filePath: string, data: any[]): Promise<string> {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, path.resolve(filePath));
    return `File written to ${filePath}`;
  }

  create(createCsvReaderDto: CreateCsvReaderDto) {
    return 'This action adds a new csvReader';
  }

  findAll() {
    return `This action returns all csvReader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} csvReader`;
  }

  update(id: number, updateCsvReaderDto: UpdateCsvReaderDto) {
    return `This action updates a #${id} csvReader`;
  }

  remove(id: number) {
    return `This action removes a #${id} csvReader`;
  }
}
