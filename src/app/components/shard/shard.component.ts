import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shard',
  templateUrl: './shard.component.html',
  styleUrls: ['./shard.component.css']
})
export class ShardComponent implements OnInit {

  position = {x: 0, y:64}

  @Input() public left: number;

  constructor() {}

  ngOnInit() {
    this.position.x = this.left;
  }

}
