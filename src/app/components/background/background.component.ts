import { Component, OnInit, Input, ViewChild, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable, Scheduler } from 'rxjs/Rx';

import { LerpService } from '../../services/lerp/lerp.service';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';
import { DataRetrievalService, levelData } from '../../services/data-retrieval/data-retrieval.service';

import { BushComponent } from '../bush/bush.component';
import { FloatingTextComponent } from '../floating-text/floating-text.component'
import { HorizontalBarChartComponent } from '../horizontal-bar-chart/horizontal-bar-chart.component';
import { VerticalBarChartComponent } from '../vertical-bar-chart/vertical-bar-chart.component';
import { LevelEndComponent } from '../level-end/level-end.component';
import { VideoBoxComponent } from '../video-box/video-box.component';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  entryComponents: [BushComponent, FloatingTextComponent, HorizontalBarChartComponent, VerticalBarChartComponent, LevelEndComponent, VideoBoxComponent]
})
export class BackgroundComponent implements OnInit {

  private position = { x: -100, y: 0 };
  private speed = 200;
  private charScreenPositionX;
  private levelData: levelData;
  private gameCompleted = false;
  private componentMap = {
    "bush": BushComponent,
    "floating-text": FloatingTextComponent,
    "horizontal-bar-chart": HorizontalBarChartComponent,
    "vertical-bar-chart": VerticalBarChartComponent,
    "video": VideoBoxComponent,
    "level-end": LevelEndComponent
  };
  private currentComponent;


  constructor(
    private lerpService: LerpService,
    private charPositionOnService: CharPositionOnScreenService,
    private dataRetrievalService: DataRetrievalService,
    private resolver: ComponentFactoryResolver) {

    charPositionOnService.charScreenPosition$.subscribe(val => this.charScreenPositionX = val);
    charPositionOnService.gameCompleted$.subscribe(completed => this.completeLevel(completed));
  }

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  ngOnInit() {
    // Draw Distance
    this.dataRetrievalService.levelData$.subscribe((res) => {
      this.drawDistance(res);
      this.levelData = res;
    });

    // Move Distance
    this.reactToCharacterMove();
  }

  private drawDistance = (levelData: levelData) => {
    if (!levelData) {
      return;
    }
    this.currentComponent = null;
    levelData.background.map((component) => {this.createComponent(component)});

  }

  private createComponent(data: {type: any, inputs: any }){
    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(this.componentMap[data.type]);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // Inputs arent being added above - this line will add - not sure why input provider isnt working
    Object.keys(data.inputs).map(input => component.instance[input] = data.inputs[input])

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    this.currentComponent += component;
  }

  moveBackgroundIfOutOfBounds = (position, speed, positionOnScreen, boundaryPercentage) => {
    if ((speed.x > 0 && positionOnScreen > boundaryPercentage) || (speed.x < 0 && positionOnScreen < boundaryPercentage) || (speed.x > 0 && position.x >= -100)) {
      return { x: position.x, y: position.y };
    }
    return this.lerpService.calculateNewPosition(this.position, speed)
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
      .scan(this.lerpService.lerp)
      .takeWhile(value => this.gameCompleted === false)
      .subscribe(result => {
        this.position = result;
      });

  }

  private completeLevel = (completed) => {
    if (completed === true) {
      this.gameCompleted = completed;
      this.speed = 0;
      this.position.x -= 200;
    }
  }
}
