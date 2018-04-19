import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { LerpService } from '../../services/lerp/lerp.service';
import { Observable, Scheduler } from 'rxjs/Rx';

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

  constructor(private lerpService: LerpService) {
    this.lerp = lerpService.lerp;
    this.calculateNewPosition = lerpService.calculateNewPosition;
  }

  ngOnInit() {

    const leftArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.calculateNewPosition(this.position, {x: -this.speed, y: 0}));
    const rightArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.calculateNewPosition(this.position, {x: this.speed, y: 0}));

    const move$ = merge(leftArrow$, rightArrow$);
    const animationFrame$ = Observable.interval(0, Scheduler.animationFrame);

    const smoothMove$ = animationFrame$
      .withLatestFrom(move$, (frame, move) => move)
      .scan(this.lerp)
      .subscribe(result => {
        this.position = result;
      });

  }


}
