import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

  onScreen = '';
  position = { x: 0, y: 64 }

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
            this.onScreen = 'show';
          } else {
            this.onScreen = '';
          }
        }
      )
  }
}
