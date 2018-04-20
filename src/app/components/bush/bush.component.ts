import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bush',
  templateUrl: './bush.component.html',
  styleUrls: ['./bush.component.css']
})
export class BushComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public size: string;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom ? this.bottom : 64;
  }

}
