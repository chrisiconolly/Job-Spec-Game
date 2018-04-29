import { Injectable } from '@angular/core';

@Injectable()
export class LerpService { // Linear interpolation function
  constructor() { }

  public lerp(start, end): IPosition {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const rate = 0.05;

    return {
      x: start.x + dx * rate,
      y: start.y + dy * rate,
    };
  }

  public calculateNewPosition(position, speed): IPosition {
    return {
      x: (position.x + speed.x),
      y: (position.y + speed.y)
    };
  }
}
