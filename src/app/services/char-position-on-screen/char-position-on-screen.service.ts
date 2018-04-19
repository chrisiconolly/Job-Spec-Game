import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ScreenSizeService } from './../screen-size/screen-size.service';

@Injectable()
export class CharPositionOnScreenService {

  screenWidth: number;
  screenHeight: number;
  charPosition;
  charScreenPosition: number
  charScreenPosition$: BehaviorSubject<number>

  constructor(private screenSizeService: ScreenSizeService) {
    const windowSize$ = screenSizeService.width$
      .subscribe(result => { this.screenWidth = result; });
    this.charScreenPosition$ = new BehaviorSubject(0);
  }

  setCharPosition = (position) => {
    this.charPosition = position;
    this.charScreenPosition = this.calculateCharaterScreenPosition(this.charPosition, this.screenWidth);
    this.charScreenPosition$.next(this.charScreenPosition);
  };

  calculateCharaterScreenPosition = (position, width: number) => {
    return (position.x / <number>(width - 100)) * 100; // Subtract 100 for char width
  }

}
