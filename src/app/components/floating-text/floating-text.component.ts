import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'floating-text',
  templateUrl: './floating-text.component.html',
  styleUrls: ['./floating-text.component.css']
})
export class FloatingTextComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public text: string;
  @Input() public design: string = 'transparent';

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
  }


}
