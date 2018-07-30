import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  onScreen = false;
  position = {x: 0, y:64}
  flowerMap = {
    1: -732,
    2: -632,
    3: -572,
    4: -492,
    5: -412,
  }


  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public data;
  @Input() public title;

  constructor(public elRef: ElementRef, public charPositionOnScreenService: CharPositionOnScreenService) { }

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
    this.charPositionOnScreenService.charXPosition$
      .subscribe( position => {
          if ((this.left * 1) + (290 * 1) < position - this.elRef.nativeElement.parentElement.offsetLeft) {
            this.onScreen = true;
          }
        }
      )
  }

  private getHeight = (score: number) => {
    if (this.onScreen) {
      return this.flowerMap[score];
    }
    return -1000;
  }

}
