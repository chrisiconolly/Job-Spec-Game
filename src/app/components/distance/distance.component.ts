import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable, Scheduler } from 'rxjs/Rx';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';
import { DataRetrievalService, levelData } from '../../services/data-retrieval/data-retrieval.service';

import { BushComponent } from '../bush/bush.component';
import { CloudComponent } from '../cloud/cloud.component';
import { LondonBridgeComponent } from '../london-bridge/london-bridge.component';
import { ShardComponent } from '../shard/shard.component';

@Component({
  selector: 'distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {

  position = { x: -100, y: 0 };
  speed = 150;
  lerp;
  calculateNewPosition;
  charScreenPositionX;
  gameCompleted = false;
  levelData$: Observable<levelData>;
  levelData: levelData;
  componentMap = {
    "bush": BushComponent,
    "cloud": CloudComponent,
    "london-bridge": LondonBridgeComponent,
    "shard": ShardComponent
  };

  @Input() data: string;

  constructor(
    private lerpService: LerpService,
    private charPositionOnService: CharPositionOnScreenService,
    private dataRetrievalService: DataRetrievalService) {

    this.lerp = lerpService.lerp;
    this.calculateNewPosition = lerpService.calculateNewPosition;
    charPositionOnService.charScreenPosition$.subscribe(val => this.charScreenPositionX = val);
    charPositionOnService.gameCompleted$.subscribe(completed => {
      if (completed === true) {
        this.gameCompleted = completed
        this.speed = 0
      }
    });

    this.levelData$ = dataRetrievalService.levelData$;
  }

  ngOnInit() {
    // Draw Distance
    this.levelData$.subscribe((res) => this.drawDistance(res))

    // Move Distance
    this.reactToCharacterMove();
  }

  private drawDistance = (levelData: levelData) => {
    console.log(levelData);
  }

  private reactToCharacterMove = () => {
    const leftArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft')
      .map(event => this.moveBackgroundIfOutOfBounds(this.position, { x: this.speed, y: 0 }, this.charScreenPositionX, 21));
    const rightArrow$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight')
      .map(event => this.moveBackgroundIfOutOfBounds(this.position, { x: -this.speed, y: 0 }, this.charScreenPositionX, 79));

    const move$ = merge(leftArrow$, rightArrow$);
    const animationFrame$ = Observable.interval(0, Scheduler.animationFrame);

    const smoothMove$ = animationFrame$
      .withLatestFrom(move$, (frame, move) => move)
      .scan(this.lerp)
      .takeWhile(value => this.gameCompleted === false)
      .subscribe(result => {
        this.position = result;
      });
  }

  private moveBackgroundIfOutOfBounds = (position, speed, positionOnScreen, boundaryPercentage) => {
    if ((speed.x > 0 && positionOnScreen > boundaryPercentage) || (speed.x < 0 && positionOnScreen < boundaryPercentage) || (speed.x > 0 && position.x >= -100)) {
      return { x: position.x, y: position.y };
    }
    return this.calculateNewPosition(this.position, speed)
  }

}