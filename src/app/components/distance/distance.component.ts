import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import {
  map,
  filter,
  withLatestFrom,
  scan,
  takeWhile,
  repeat,
} from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {
  public position: IPosition;
  public speed: number;
  public charScreenPositionX: number;
  public gameCompleted: boolean;

  constructor(
    private lerpService: LerpService,
    private charPositionOnService: CharPositionOnScreenService,
  ) {
    this.position = { x: -100, y: 0 };
    this.speed = 150;
    this.gameCompleted = false;

    charPositionOnService.charScreenPosition$
      .subscribe(val => this.charScreenPositionX = val);

    charPositionOnService.gameCompleted$
      .subscribe(completed => {
        if (completed) {
          this.gameCompleted = true;
          this.speed = 0;
        }
      });
  }

  public moveBackgroundIfOutOfBounds(
    position: IPosition,
    speed: IPosition,
    positionOnScreen: number,
    boundaryPercentage: number,
  ): IPosition {
    if ((speed.x > 0 && positionOnScreen > boundaryPercentage)
        || (speed.x < 0 && positionOnScreen < boundaryPercentage)
        || (speed.x > 0 && position.x >= -100)) {
      return {x: position.x, y: position.y};
    }

    return this.lerpService.calculateNewPosition(this.position, speed);
  }

  public ngOnInit(): void {
    const leftArrow$: Observable<IPosition> = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowLeft'),
        map(event => this.moveBackgroundIfOutOfBounds(this.position, {x: this.speed, y: 0}, this.charScreenPositionX, 21)));

    const rightArrow$: Observable<IPosition> = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowRight'),
        map(event => this.moveBackgroundIfOutOfBounds(this.position, {x: -this.speed, y: 0}, this.charScreenPositionX, 79)));

    const move$: Observable<IPosition> = merge(leftArrow$, rightArrow$);

    Observable.of(0, animationFrame)
      .pipe(
        repeat(),
        withLatestFrom(move$, (frame, move) => move),
        scan(this.lerpService.lerp),
        takeWhile(value => this.gameCompleted === false),
      )
      .subscribe((result: IPosition) => this.position = result);
  }
}
