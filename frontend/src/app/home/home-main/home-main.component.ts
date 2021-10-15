import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/Card';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  public leftCards: Card[] = [
    {
      title: 'CSV to ASCII Table',
      desc: 'Convert CSV Data into an entirely text-based table. Proves useful every once in a while.',
      imagePath: 'https://cdn.pixabay.com/photo/2016/04/01/12/08/table-1300555_1280.png',
      link: 'projects/ascii-table'
    }
  ];
  public rightCards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
