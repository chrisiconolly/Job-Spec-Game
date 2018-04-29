import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shard',
  templateUrl: './shard.component.html',
  styleUrls: ['./shard.component.css']
})
export class ShardComponent implements OnInit {
  position: IPosition;

  @Input() public left: number;

  constructor() {
    this.position = { x: 0, y: 64 };
  }

  ngOnInit() {
    this.position.x = this.left;
  }

}
