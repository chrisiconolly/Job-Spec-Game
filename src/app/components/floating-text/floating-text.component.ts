import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'floating-text',
  templateUrl: './floating-text.component.html',
  styleUrls: ['./floating-text.component.css']
})
export class FloatingTextComponent implements OnInit {

  position = {x: 0, y:64}
  animation: string = "";

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public text: string;
  @Input() public design: string = 'transparent';

  constructor(public elRef: ElementRef, public charPositionOnScreenService: CharPositionOnScreenService) { }

  ngOnInit() {
    this.position.x = this.left;
    this.position.y = this.bottom;
    this.charPositionOnScreenService.charXPosition$
      .subscribe( position => {
          if ((this.left * 1) + (290 * 1) < position - this.elRef.nativeElement.parentElement.offsetLeft) {
            this.triggerPassAnimation()
          }
        }
      )
  }

  triggerPassAnimation() {
    //this.animation = 'spin';
  }

}
