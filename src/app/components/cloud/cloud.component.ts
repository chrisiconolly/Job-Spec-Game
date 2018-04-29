import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {
  position: IPosition;

  @Input()
  public left: number;

  @Input()
  public top: number;

  constructor() {
    this.position = { x: 0, y: 0 };
  }

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.top;
  }

}
