import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'london-bridge',
  templateUrl: './london-bridge.component.html',
  styleUrls: ['./london-bridge.component.css']
})
export class LondonBridgeComponent implements OnInit {
  public position: IPosition;

  @Input()
  public left: number;

  constructor() {
    this.position = { x: 0, y: 64 };
  }

  public ngOnInit(): void {
    this.position.x = this.left;
  }
}
