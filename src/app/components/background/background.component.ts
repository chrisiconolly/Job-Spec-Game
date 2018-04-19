import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  position = { x: 0, y: 0 };
  speed = 100;

  constructor() { }

  ngOnInit() {

    const leftArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.calculateNewPosition(this.position, {x: this.speed, y: 0}));
    const rightArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.calculateNewPosition(this.position, {x: -this.speed, y: 0}));

    const move$ = merge(leftArrow$, rightArrow$)
      .subscribe(position => this.position = position)

  }

  calculateNewPosition = (position, speed) => {
    return {x: (position.x + speed.x), y: (position.y + speed.y)}
  }

}
