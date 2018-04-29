import {
  Component,
  OnInit,
  Input,
  ElementRef,
} from '@angular/core';
import {
  CharPositionOnScreenService,
} from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'level-end',
  templateUrl: './level-end.component.html',
  styleUrls: ['./level-end.component.scss']
})
export class LevelEndComponent implements OnInit {
  position: IPosition;
  gameCompleted = false;

  @Input() public left: number;

  constructor(
    public elRef: ElementRef,
    private charPositionOnScreenService: CharPositionOnScreenService,
  ) {
    this.position = { x: 0, y: 64 };
  }

  public ngOnInit(): void {
    this.position.x = this.left;

    this.charPositionOnScreenService.charXPosition$
      .subscribe(position => {
          if ((this.left * 1) + (290 * 1) < position - this.elRef.nativeElement.parentElement.offsetLeft) {
            this.gameCompleted = true;
            this.charPositionOnScreenService.setGameCompleted();
          }
        }
      );
  }
}
