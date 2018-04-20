import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

  position = { x: 0, y: 64 }

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public data;
  @Input() public title;

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
