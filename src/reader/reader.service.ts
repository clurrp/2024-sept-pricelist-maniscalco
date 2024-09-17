import { Injectable } from '@nestjs/common';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
// TODO: UOM, Price(UOM) -> Invoice Cost Per UOM, Sold As, UOM Per Carton, PC/SH per Carton, UOM Weight
// TODO: 

interface ModifiedData {
  seriesName: string;
  sku: string;
  itemDescription: string;
  uom?: string;
  invoiceCostPerUOM?: string;
  soldAs?: string;
  uomPerCarton?: string;
  pcShPerCarton?: string;
  uomWeight?: string;
}

@Injectable()
export class ReaderService {
  async readPriceLevelA(): Promise<string[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(
        path.resolve('Maniscalco-Price-Level-A-Simple_2024-v2.csv'),
      )
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async mapPriceLevelA(data: any[], seriesFilter?: string): Promise<ModifiedData[]> {
    const results = data.map((item) => {
      // Normalize keys by trimming and converting to lowercase
      const normalizedItem = Object.keys(item).reduce((acc, key) => {
        acc[key.trim().toLowerCase()] = item[key];
        return acc;
      }, {});

      const sku = normalizedItem['sku #'];
      const seriesName = normalizedItem['series'];
      const itemDescription = normalizedItem['item description'];
      const uom = normalizedItem['uom'];
      const invoiceCostPerUOM = normalizedItem['price (uom)'];
      const soldAs = normalizedItem['sold as'];
      const uomPerCarton = normalizedItem['uom per carton'];
      const pcShPerCarton = normalizedItem['pc/sh per carton'];
      const uomWeight = normalizedItem['uom weight (lb.)'];

      if (sku == null || seriesName == null || itemDescription == null) {
        throw new Error(`Missing required field in item: ${JSON.stringify(item)}`);
      }

      return {
        sku,
        seriesName,
        itemDescription,
        uom,
        invoiceCostPerUOM,
        soldAs,
        uomPerCarton,
        pcShPerCarton,
        uomWeight,
      }
    })
    
    if (seriesFilter) {
      return results.filter((item) => item.seriesName.trim() === seriesFilter.trim());
    }

    return results
  }

  async mapSpreedsheet(data: any[], seriesFilter: string): Promise<any[]> {
    return data.map((item) => {
      // Normalize keys by trimming and converting to lowercase
      const normalizedItem = Object.keys(item).reduce((acc, key) => {
        acc[key.trim().toLowerCase()] = item[key];
        return acc;
      }, {});

      const sku = normalizedItem['sku #'];
      const seriesName = normalizedItem['series'];
      const itemDescription = normalizedItem['item description'];
      const uom = normalizedItem['uom'];
      const invoiceCostPerUOM = normalizedItem['price (uom)'];
      const soldAs = normalizedItem['sold as'];
      const uomPerCarton = normalizedItem['uom per carton'];
      const pcShPerCarton = normalizedItem['pc/sh per carton'];
      const uomWeight = normalizedItem['uom weight (lb.)'];

      if (sku == null || seriesName == null || itemDescription == null) {
        throw new Error(`Missing required field in item: ${JSON.stringify(item)}`);
      }

      return {
        sku,
        seriesName,
        itemDescription,
        uom,
        invoiceCostPerUOM,
        soldAs,
        uomPerCarton,
        pcShPerCarton,
        uomWeight,
      }
    }).filter((item) => item.seriesName.trim() === seriesFilter.trim());
  }

  async parseData(): Promise<any[]> {
    const priceLevelAData = await this.readPriceLevelA();
    const modifiedPriceLevelAData = await this.mapPriceLevelA(priceLevelAData); // , 'Alhambra'
    // console.log({ modifiedPriceLevelAData });
    return modifiedPriceLevelAData;
  }
}
