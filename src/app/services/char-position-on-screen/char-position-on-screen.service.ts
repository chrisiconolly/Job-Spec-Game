import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ScreenSizeService } from './../screen-size/screen-size.service';

@Injectable()
export class CharPositionOnScreenService {
  screenWidth: number;
  screenHeight: number;
  charPosition: IPosition;
  charScreenPosition: number;
  charScreenPosition$: BehaviorSubject<number>;
  charXPosition$: BehaviorSubject<number>;
  gameCompleted$: BehaviorSubject<boolean>;

  constructor(
    private screenSizeService: ScreenSizeService,
  ) {
    this.charScreenPosition$ = new BehaviorSubject(0);
    this.charXPosition$ = new BehaviorSubject(0);
    this.gameCompleted$ = new BehaviorSubject(false);

    this.screenSizeService.width$
      .subscribe(result => this.screenWidth = result);
  }

  public setCharPosition(position): void {
    this.charPosition = position;
    this.charXPosition$.next(this.charPosition.x);
    this.charScreenPosition$.next(this.charScreenPosition);

    this.charScreenPosition = this
      .calculateCharaterScreenPosition(this.charPosition, this.screenWidth);
  }

  public calculateCharaterScreenPosition(position, width: number): number {
    // Subtract 100 for char width
    return (position.x / <number>(width - 100)) * 100;
  }

  public setGameCompleted(): void {
    this.gameCompleted$.next(true);
  }
}
