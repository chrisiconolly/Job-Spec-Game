import { Component, OnInit, Input } from '@angular/core';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

@Component({
  selector: 'level-selector',
  templateUrl: './level-selector.component.html',
  styleUrls: ['./level-selector.component.scss']
})
export class LevelSelectorComponent implements OnInit {

  @Input() public levels: object[];

  constructor(private charPositionOnScreenService: CharPositionOnScreenService) { }

  ngOnInit() {
    this.charPositionOnScreenService.setGameCompleted();
  }

}
