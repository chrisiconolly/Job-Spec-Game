import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'london-bridge',
  templateUrl: './london-bridge.component.html',
  styleUrls: ['./london-bridge.component.css']
})
export class LondonBridgeComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
  }
}
