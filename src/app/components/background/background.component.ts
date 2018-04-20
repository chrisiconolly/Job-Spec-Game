import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable, Scheduler } from 'rxjs/Rx';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  @Input() role: string;

  position = { x: -100, y: 0 };
  speed = 200;
  lerp;
  calculateNewPosition;
  charScreenPositionX;
  introText = "<h3>The role:</h3><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries </p><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>";
  languageData = [
    { label: "Javascript", value: "5" },
    { label: "PHP", value: "2" },
    { label: "HTML", value: "4" },
    { label: "CSS", value: "4" },
    { label: "Coffee", value: "5" },
  ];

  constructor(private lerpService: LerpService, private charPositionOnService: CharPositionOnScreenService) {
    this.lerp = lerpService.lerp;
    this.calculateNewPosition = lerpService.calculateNewPosition;
    charPositionOnService.charScreenPosition$.subscribe(
      val => this.charScreenPositionX = val
    );
  }

  moveBackgroundIfOutOfBounds = (position, speed, positionOnScreen, boundaryPercentage) => {
    if ((speed.x > 0 && positionOnScreen > boundaryPercentage) || (speed.x < 0 && positionOnScreen < boundaryPercentage) || (speed.x > 0 && position.x >= -100)) {
      return {x: position.x, y: position.y};
    }
    return this.calculateNewPosition(this.position, speed)
  }

  ngOnInit() {

    const leftArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.moveBackgroundIfOutOfBounds(this.position, {x: this.speed, y: 0}, this.charScreenPositionX, 21));
    const rightArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.moveBackgroundIfOutOfBounds(this.position, {x: -this.speed, y: 0}, this.charScreenPositionX, 79));

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
