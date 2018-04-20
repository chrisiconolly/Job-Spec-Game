import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public width: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
  }
}

