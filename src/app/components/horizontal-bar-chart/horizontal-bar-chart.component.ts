import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {
  public position: IPosition;

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
