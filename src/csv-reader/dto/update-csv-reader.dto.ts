import { PartialType } from '@nestjs/mapped-types';
import { CreateCsvReaderDto } from './create-csv-reader.dto';

export class UpdateCsvReaderDto extends PartialType(CreateCsvReaderDto) {}
