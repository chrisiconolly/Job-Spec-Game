import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.css']
})
export class ScoreBarComponent implements OnInit {

  score: number = 1000;

  @Input() public role:string;

  constructor() { }

  ngOnInit() {
    const leftArrowDown$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowLeft');
    const rightArrowDown$ = fromEvent(document, 'keydown')
      .filter((event: KeyboardEvent) => event.key === 'ArrowRight');

    const move$ = merge(leftArrowDown$, rightArrowDown$)
      .startWith(1000)
      .map(event => 10)
      .scan( (acc, curr) => acc + curr )
      .subscribe(score => this.score = score)
  }

}
