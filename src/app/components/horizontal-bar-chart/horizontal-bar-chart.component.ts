import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

  position = { x: 0, y: 64 }
  data;
  title;
  Arr = Array; //Array type captured in a variable
  flowerMap = {
    1: -732,
    2: -632,
    3: -572,
    4: -492,
    5: -412,
  }

  @Input() public left: number;
  @Input() public bottom: number;

  constructor() { }

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
    this.data = [
      { label: "Javascript", value: "5" },
      { label: "PHP", value: "2" },
      { label: "HTML", value: "4" },
      { label: "CSS", value: "4" },
      { label: "Coffee", value: "5" },
    ];
    this.title = "Languages"
  }

}
