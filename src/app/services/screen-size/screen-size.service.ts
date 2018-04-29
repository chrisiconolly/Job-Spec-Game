import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class ScreenSizeService {
  public width$: Observable<number>;
  private width: BehaviorSubject<number>;

  constructor() {
    this.width = new BehaviorSubject(window.innerWidth);
    this.width$ = this.width.asObservable();

    fromEvent(window, 'resize')
        .pipe(debounceTime(500))
        .subscribe(() => this.width.next(window.innerWidth));
  }
}
