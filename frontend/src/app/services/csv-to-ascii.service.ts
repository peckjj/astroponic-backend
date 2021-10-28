import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvToAsciiService {

  constructor() { }

  public generate(headers: string, data: string, padding: number, delimiter: RegExp): string {
    let ret = ""
    
    const headerArr = headers.split(delimiter);
    const dataArr = data.split(delimiter);

    if (dataArr.length % headerArr.length !== 0) {
      return "There is not enough data to fill all columnns that were given. Commas must separate all values even if they are empty. ('A1,,A3')'";
    }

    const colLengths = this.getColLengths(headerArr, dataArr, padding);
    const tableLen = colLengths.reduce((a, v) => a + v + 1) + 1;

    ret += this.createSeparator(tableLen, "-");

    for (let i = 0; i < headerArr.length; i++) {
      ret += "|" + " ".repeat(Math.floor( (colLengths[i] - headerArr[i].length) / 2)) + headerArr[i] + " ".repeat(Math.ceil((colLengths[i] - headerArr[i].length) / 2)); 
    }

    ret += "|\n";

    ret += this.createSeparator(tableLen, "=");

    for (let i = 0; i < dataArr.length; i++) {
      ret += "|" + " ".repeat(Math.floor( (colLengths[i % headerArr.length] - dataArr[i].length) / 2)) + dataArr[i] + " ".repeat(Math.ceil((colLengths[i % headerArr.length] - dataArr[i].length) / 2)); 
      ret += ((i + 1) % headerArr.length === 0 ? "|\n" + this.createSeparator(tableLen, "-") : "");
    }

    return ret;
  }

  private createSeparator(tableLen: number, symbol: string): string {
    return symbol.repeat(tableLen) + symbol + "\n";
  }

  private getColLengths(headers: string[], data: string[], padding: number): number[] {
    let ret = [];
    for (let i = 0; i < headers.length; i++) {
      let colData = data.filter((e, index) => index % headers.length === i);
      let max = headers[i].length + padding + 1;
      for (let datum of colData) {
        max = Math.max(datum.length + padding, max);
      }
      ret.push(max);
    }
    return ret;
  }
}
