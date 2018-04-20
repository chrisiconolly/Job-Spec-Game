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

  position = { x: 200, y: 64 };
  speed = 200;
  lerp;
  calculateNewPosition;
  charScreenPositionX;
  moving: boolean;
  direction;
  jumping: boolean = false;
  gameCompleted: boolean = false;

  constructor(private lerpService: LerpService, private charPositionOnService: CharPositionOnScreenService) {
    this.lerp = lerpService.lerp;
    this.calculateNewPosition = lerpService.calculateNewPosition;
    charPositionOnService.charScreenPosition$.subscribe(val => this.charScreenPositionX = val);
    charPositionOnService.gameCompleted$.subscribe(completed => {
      if (completed === true) {
        this.gameCompleted = completed
        this.speed = 0
      }

    });
  }

  moveCharIfInBounds = (position, speed, positionOnScreen, boundaryPercentage) => {
    this.moving = true;
    if (speed.x > 0) this.direction = 'right';
    if (speed.x < 0) this.direction = 'left';
    if ((speed.x < 0 && positionOnScreen < boundaryPercentage) || (speed.x > 0 && positionOnScreen > boundaryPercentage)) {
      return { x: position.x, y: position.y };
    }
    return this.calculateNewPosition(this.position, speed)
  }

  ngOnInit() {
    // Moving
    const leftArrowDown$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.moveCharIfInBounds(this.position, { x: -this.speed, y: 0 }, this.charScreenPositionX, 20));
    const rightArrowDown$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.moveCharIfInBounds(this.position, { x: +this.speed, y: 0 }, this.charScreenPositionX, 85));

    const move$ = merge(leftArrowDown$, rightArrowDown$);
    const animationFrame$ = Observable.interval(0, Scheduler.animationFrame);

    const smoothMove$ = animationFrame$
      .withLatestFrom(move$, (frame, move) => move)
      .scan(this.lerp)
      .takeWhile(value => this.gameCompleted === false)
      .subscribe(result => {
        this.position.x = result.x;
        this.charPositionOnService.setCharPosition(result);
      });


    // Stopping
    const leftArrowUp$ = fromEvent(document, 'keyup')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft');
    const rightArrowUp$ = fromEvent(document, 'keyup')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight');

    const stop$ = merge(leftArrowUp$, rightArrowUp$)
      .subscribe(event => this.moving = false);


    // Jumping
    const upArrowDown$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowUp')
      .subscribe(event => {
        if (this.jumping) {
          return;
        }
        this.jumping = true;
        this.moving = true;
        this.position.y = this.position.y + 200;
        setTimeout(() => {
          this.jumping = false;
          this.moving = false;
          this.position.y = this.position.y - 200;
        }, 300);
      });

  }


}
