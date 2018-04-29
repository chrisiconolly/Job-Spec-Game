import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent implements OnInit {
  public position: IPosition;

  @Input()
  public left: number;

  @Input()
  public role: string;

  constructor() {
    this.position = {x: 200, y: 400};
  }

  public ngOnInit(): void {
    this.position.x = this.left;
  }
}
