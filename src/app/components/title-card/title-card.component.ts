import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent implements OnInit {

  specTitle = 'Software Engineer';
  position = {x: 200, y: 400};

  constructor() { }

  ngOnInit() {
  }

}
