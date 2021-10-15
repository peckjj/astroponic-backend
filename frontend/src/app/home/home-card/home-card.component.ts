import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/Card';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() public card: Card = {title: '', desc: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
