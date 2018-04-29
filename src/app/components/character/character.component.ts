import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import {
  map,
  filter,
  delay,
  withLatestFrom,
  scan,
  takeWhile,
  repeat,
} from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

enum Direction {
  Left = 'LEFT',
  Right = 'RIGHT',
}

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  position: IPosition;
  speed: number;
  earthLevel: number;
  charScreenPositionX: number;
  moving: boolean;
  direction: Direction;
  jumping: boolean;
  gameCompleted: boolean;

  constructor(
    private lerpService: LerpService,
    private charPositionOnService: CharPositionOnScreenService
  ) {
    this.speed = 200;
    this.earthLevel = 64;
    this.position = { x: 200, y: this.earthLevel };
    this.jumping = false;
    this.gameCompleted = false;

    charPositionOnService.charScreenPosition$
      .subscribe(val => this.charScreenPositionX = val);

    charPositionOnService.gameCompleted$
      .subscribe(completed => {
        if (completed) {
          this.gameCompleted = true;
          this.speed = 0;
        }});
  }

  public moveCharIfInBounds(
    position: IPosition,
    speed: IPosition,
    positionOnScreen: number,
    boundaryPercentage: number,
  ): IPosition {
    this.moving = true;

    if (speed.x > 0) {
      this.direction = Direction.Right;
    } else {
      this.direction = Direction.Left;
    }

    if ((speed.x < 0 && positionOnScreen < boundaryPercentage) ||
        (speed.x > 0 && positionOnScreen > boundaryPercentage)) {
      return { x: position.x, y: position.y };
    }
    return this.lerpService.calculateNewPosition(this.position, speed);
  }

  public ngOnInit(): void {
    // Moving
    const leftArrowDown$: Observable<IPosition> = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowLeft'),
        map(() => this.moveCharIfInBounds(
          this.position, { x: -this.speed, y: 0 }, this.charScreenPositionX, 20)));

    const rightArrowDown$: Observable<IPosition> = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowRight'),
        map(() => this.moveCharIfInBounds(
          this.position, { x: +this.speed, y: 0 }, this.charScreenPositionX, 85)));

    const move$: Observable<IPosition> = merge(leftArrowDown$, rightArrowDown$);

    Observable.of(0, animationFrame)
      .pipe(
        repeat(),
        withLatestFrom(move$, (frame, move) => move),
        scan(this.lerpService.lerp),
        takeWhile(() => this.gameCompleted === false),
      )
      .subscribe((result: IPosition) => {
        this.position.x = result.x;
        this.charPositionOnService.setCharPosition(result);
      });

    // Stopping
    const leftArrowUp$: Observable<{}> = fromEvent(document, 'keyup')
      .pipe(filter((event: KeyboardEvent) => event.key === 'ArrowLeft'));

    const rightArrowUp$: Observable<{}> = fromEvent(document, 'keyup')
      .pipe(filter((event: KeyboardEvent) => event.key === 'ArrowRight'));

    merge(leftArrowUp$, rightArrowUp$).subscribe(() => this.moving = false);


    // Jumping
    fromEvent(document, 'keyup')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowUp'),
        delay(250),
      )
      .subscribe(() => {
        this.jumping = false;
        this.moving = false;
        this.position.y = this.earthLevel;
      });

    fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowUp'))
      .subscribe(() => {
        if (this.jumping) {
          return;
        }

        this.jumping = true;
        this.moving = true;
        this.position.y = this.position.y + 200;
      });
  }
}
