import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Rx';
import { DataRetrievalService, levelData } from '../../services/data-retrieval/data-retrieval.service';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.css']
})
export class ScoreBarComponent implements OnInit {

  private score: number = 1000;
  private role: string = '';

  constructor(private dataRetrievalService: DataRetrievalService) {
    this.dataRetrievalService.levelData$.subscribe((res) => {
      if (res !== undefined) this.role = res.role;
    })
   }

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

