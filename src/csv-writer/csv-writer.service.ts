import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class CsvWriterService {
  async writePriceLevelA(data: any[]): Promise<string> {
    const filePath = 'test-maniscalco-pricelist.csv';

    const csvWriter = createObjectCsvWriter({
      path: path.resolve(filePath),
      header: [
        { id: 'seriesName', title: 'SERIES NAME' },
        { id: 'sku', title: 'SKU #' },
        { id: 'itemDescription', title: 'ITEM DESCRIPTION' },
        { id: 'uom', title: 'UOM' },
        { id: 'invoiceCost', title: 'INVOICE COST' },
        { id: 'soldAs', title: 'SOLD AS' },
        { id: 'uomPerCarton', title: 'UOM PER CARTON' },
        { id: 'pcShPerCarton', title: 'PC/SH PER CARTON' },
        { id: 'uomWeight', title: 'UOM WEIGHT (LB.)' },
        // { id: 'pcPerCarton', title: 'PC PER CARTON' },
        // { id: 'lbsPerSf', title: 'LBS PER SF' },
        { id: 'forecastFreight', title: 'FORECAST FREIGHT' },
        { id: 'forecastVarIncl', title: 'FORECAST VAR INCL' },
        { id: 'surchFee', title: 'SURCH FEE' },
        { id: 'postedFreight', title: 'POSTED FREIGHT' },
        { id: 'forecastPosted', title: 'FORECAST POSTED' },
        { id: 'costLoad', title: 'COST LOAD' },
        { id: 'costOfGoodsSold', title: 'COST OF GOODS SOLD' },
        { id: 'forecastMargin', title: 'FORECAST MARGIN' },
        { id: 'computedPrice', title: 'COMPUTED PRICE' },
        { id: 'sheetPrice', title: 'SHEET PRICE' },
        { id: 'gp', title: 'GP $' },
        { id: 'gpPercent', title: 'GP %' },
      ],
    });

    const formattedData = data.map((item) => {
      const invoiceCostValue = item['invoiceCostPerUOM'];
      const invoiceCostNumber = parseFloat(
        invoiceCostValue.replace('$', ''),
      );

      console.log({ invoiceCostPerUOMValue: invoiceCostValue, invoiceCostPerUOMNumber: invoiceCostNumber });
      const isCartonPrice = item['soldAs'].trim() === 'CTN' ? `$${(invoiceCostNumber * item['uomPerCarton']).toFixed(2)}` : invoiceCostValue
      console.log({ cartonPrice: isCartonPrice });

      const seriesName = item['seriesName'];
      const sku = item['sku'];
      const itemDescription = item['itemDescription'];
      const uom = item['soldAs'].trim() === 'CTN' ? 'CTN' : item['uom'];
      const invoiceCost = isCartonPrice;
      const soldAs = item['soldAs'];
      const uomPerCarton = item['uomPerCarton'];
      const pcShPerCarton = item['pcShPerCarton'];
      const uomWeight = item['uomWeight'];
      // SPREADSHEET DATA IS BELOW
      const fCFreight = 1;
      const fCVarIncl =
        parseFloat((item['uomWeight'] * 0.01).toFixed(2)) === 0
          ? 0.01
          : parseFloat((item['uomWeight'] * 0.01).toFixed(2)); // Mani weight x 1%
      const surchFee = parseFloat((invoiceCostNumber * 0.03).toFixed(2)); // Mani price (uom) x 3%
      const postedFreight = parseFloat(
        (fCFreight + fCVarIncl + surchFee).toFixed(2),
      ); // Sum Fc Freight + Fc Var Incl + Surch Fee
      const fCPosted = parseFloat(
        (invoiceCostNumber + postedFreight).toFixed(2),
      ); // Sum Posted Freight + price (uom)
      const costLoad = parseFloat((fCPosted * 0.01).toFixed(2)); // FC posted * 1%
      const costOfGoodsSold = parseFloat((fCPosted + costLoad).toFixed(2)); // FC posted + Cost Load
      const fCMargin = 0.33; // Standard 33%
      const computedPrice = parseFloat(
        (costOfGoodsSold / (1 - fCMargin)).toFixed(2),
      ); // Cost of Goods Sold / (1 - F/C Margin)
      const sheetPrice = this.adjustFactor(computedPrice); // Adjusted Factor
      const gp = parseFloat((sheetPrice - costOfGoodsSold).toFixed(2)); // Sheet Price - Cost of Goods Sold
      const gpPercent = parseFloat(((gp / sheetPrice) * 100).toFixed(2)); // GP / Sheet Price

      this.validateData(sku, seriesName, itemDescription);

      return {
        sku,
        seriesName,
        itemDescription,
        uom,
        invoiceCost,
        soldAs,
        uomPerCarton,
        pcShPerCarton,
        uomWeight,
        forecastFreight: fCFreight,
        forecastVarIncl: fCVarIncl,
        surchFee,
        postedFreight,
        forecastPosted: fCPosted,
        costLoad,
        costOfGoodsSold,
        forecastMargin: fCMargin,
        computedPrice,
        sheetPrice,
        gp,
        gpPercent,
      };
    });
    console.log({ formattedData });

    await csvWriter.writeRecords(formattedData);

    return filePath;
  }

  adjustFactor(value: number): number {
    const decimalPart = value % 1; // Get the decimal part
    const integerPart = Math.floor(value); // Get the integer part

    // Extract the second decimal place
    const secondDecimal = Math.floor(decimalPart * 100) % 10;

    let adjustedDecimal;
    if (secondDecimal >= 1 && secondDecimal <= 4) {
      adjustedDecimal = Math.floor(decimalPart * 10) / 10 + 0.05;
    } else if (secondDecimal >= 6 && secondDecimal <= 8) {
      adjustedDecimal = Math.floor(decimalPart * 10) / 10 + 0.09;
    } else {
      adjustedDecimal = Math.round(decimalPart * 10) / 10; // Default rounding
    }
    return parseFloat((integerPart + adjustedDecimal).toFixed(2));
  }

  async validateData(
    sku: string,
    seriesName: string,
    itemDescription: string,
  ): Promise<void> {
    if (!sku) {
      throw new Error(`Missing required SKU in item`);
    }
    if (!seriesName) {
      throw new Error(`Missing required seriesName in item`);
    }
    if (!itemDescription) {
      throw new Error(`Missing required itemDescription in item`);
    }
  }
}
