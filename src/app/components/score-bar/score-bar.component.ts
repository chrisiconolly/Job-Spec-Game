import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import {
  map,
  filter,
  startWith,
  scan,
} from 'rxjs/operators';

@Component({
  selector: 'score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.css']
})
export class ScoreBarComponent implements OnInit {
  public score: number;

  @Input()
  public role: string;

  constructor() {
    this.score = 1000;
  }

  public ngOnInit(): void {
    const rightArrowDown$: Observable<KeyboardEvent> = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowRight'));

    rightArrowDown$
      .pipe(
        map(() => 10),
        startWith(1000),
        scan((acc, curr) => acc + curr),
      )
      .subscribe(score => this.score = score);
  }
}
