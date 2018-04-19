import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  position = { x: 200, y: 0 };

  constructor() { }

  ngOnInit() {
  }

}
