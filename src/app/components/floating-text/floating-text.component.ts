import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'floating-text',
  templateUrl: './floating-text.component.html',
  styleUrls: ['./floating-text.component.css']
})
export class FloatingTextComponent implements OnInit {
  public position: IPosition;

  @Input()
  public left: number;

  @Input()
  public top: number;

  @Input()
  public text: string;

  @Input()
  public design: string;

  constructor() {
    this.position = { x: 0, y: 64 };
    this.design = 'transparent';
  }

  public ngOnInit(): void {
    this.position.x = this.left;
    this.position.y = this.top;
  }
}
