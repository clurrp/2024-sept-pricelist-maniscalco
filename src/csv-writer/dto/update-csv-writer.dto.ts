import { PartialType } from '@nestjs/mapped-types';
import { CreateCsvWriterDto } from './create-csv-writer.dto';

export class UpdateCsvWriterDto extends PartialType(CreateCsvWriterDto) {}
