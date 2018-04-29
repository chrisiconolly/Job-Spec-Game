import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {
  position: IPosition;
  flowerMap = {
    1: -732,
    2: -632,
    3: -572,
    4: -492,
    5: -412,
  };

  @Input()
  public left: number;

  @Input()
  public bottom: number;

  @Input()
  public data;

  @Input()
  public title;

  constructor() {
    this.position = { x: 0, y: 64 };
  }

  public ngOnInit(): void {
    this.position.x = this.left;
    this.position.y = this.bottom;
  }
}
