import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {
  public position: IPosition;

  @Input()
  public left: number;

  @Input()
  public bottom: number;

  @Input()
  public width: number;

  constructor() {
    this.position = { x: 0, y: 64 };
  }

  public ngOnInit(): void {
    this.position.x = this.left;
    this.position.y = this.bottom;
  }
}
