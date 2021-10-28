import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CsvToAsciiService } from 'src/app/services/csv-to-ascii.service';

@Component({
  selector: 'app-ascii-table',
  templateUrl: './ascii-table.component.html',
  styleUrls: ['./ascii-table.component.css']
})
export class AsciiTableComponent implements OnInit {

  @ViewChild("headers") headers!: ElementRef;
  @ViewChild("data") data!: ElementRef;
  @ViewChild("output") output!: ElementRef;
  @ViewChild("padding") padding!: ElementRef;
  @ViewChild("delimiter") delimiter!: ElementRef;
  @ViewChild("ignoreNewLine") ignoreNewLine!: ElementRef;
  @ViewChild("newLineAsDelim") newLineAsDelim!: ElementRef;

  headersPlaceholder = "Header 1, Header 2, Header 3, ...";
  dataPlaceholder = "A1, A2, A3, B1, B2, B3, ...";

  constructor(private asciiTableService: CsvToAsciiService) { }

  ngOnInit(): void {
  }

  generate(): void {
    const headerText: string = this.headers.nativeElement.value;
    let dataText: string = this.data.nativeElement.value;
    const padding: number = +(this.padding.nativeElement.value);
    let delimiter: RegExp = new RegExp(this.delimiter.nativeElement.value);

    if (this.ignoreNewLine.nativeElement.checked) {
      dataText = dataText.replace(/\n/g, '');
    }

    if (this.newLineAsDelim.nativeElement.checked) {
      delimiter = new RegExp(`[${this.delimiter.nativeElement.value}\n]`);
    }

    this.output.nativeElement.value = this.asciiTableService.generate(headerText, dataText, padding, delimiter);
  }

}
