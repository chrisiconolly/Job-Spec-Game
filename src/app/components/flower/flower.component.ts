import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;
  @Input() public bottom: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
  }
}

