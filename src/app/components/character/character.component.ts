import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable, Scheduler } from 'rxjs/Rx';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  position = { x: 200, y: 0 };
  speed = 200;
  lerp;
  calculateNewPosition;
  charScreenPositionX;

  constructor(private lerpService: LerpService, private charPositionOnService: CharPositionOnScreenService) {
    this.lerp = lerpService.lerp;
    this.calculateNewPosition = lerpService.calculateNewPosition;
    charPositionOnService.charScreenPosition$.subscribe(
      val => this.charScreenPositionX = val
    );
  }

  moveCharIfInBounds = (position, speed, positionOnScreen, boundaryPercentage) => {
    if ((speed.x < 0 && positionOnScreen < boundaryPercentage) || (speed.x > 0 && positionOnScreen > boundaryPercentage)) {
      return {x: position.x, y: position.y};
    }
    return this.calculateNewPosition(this.position, speed)
  }

  ngOnInit() {

    const leftArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.moveCharIfInBounds(this.position, {x: -this.speed, y: 0}, this.charScreenPositionX, 20));
    const rightArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.moveCharIfInBounds(this.position, {x: +this.speed, y: 0}, this.charScreenPositionX, 85));
    const move$ = merge(leftArrow$, rightArrow$);
    const animationFrame$ = Observable.interval(0, Scheduler.animationFrame);

    const smoothMove$ = animationFrame$
      .withLatestFrom(move$, (frame, move) => move)
      .scan(this.lerp)
      .subscribe(result => {
        this.position = result;
        this.charPositionOnService.setCharPosition(result);
      });

  }


}
