import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bush',
  templateUrl: './bush.component.html',
  styleUrls: ['./bush.component.css']
})
export class BushComponent implements OnInit {
  position: IPosition;

  @Input()
  public left: number;

  @Input()
  public bottom: number;

  @Input()
  public size: string;

  constructor() {
    this.position = { x: 0, y: 64 };
  }

  public ngOnInit(): void {
    this.position.x = this.left;
    this.position.y = this.bottom || 64;
  }
}
