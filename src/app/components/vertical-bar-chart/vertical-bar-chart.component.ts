import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  position = {x: 0, y:64}
  data;
  title;
  flowerMap = {
    1: -732,
    2: -652,
    3: -572,
    4: -492,
    5: -412,
  }
  test = this.flowerMap[2];


  @Input() public left: number;
  @Input() public bottom: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
    this.data = [
      {label: "Javascript", value: "5"},
      {label: "PHP", value: "2"},
      {label: "HTML", value: "4"},
      {label: "CSS", value: "4"},
      {label: "Coffee", value: "5"},
    ];
    this.title = "Languages"
  }

}
