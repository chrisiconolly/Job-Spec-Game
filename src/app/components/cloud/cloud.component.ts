import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  position = {x: 0, y:0}

  @Input() public left: number;
  @Input() public top: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.top;
  }

}
