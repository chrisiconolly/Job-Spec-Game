import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';

@Injectable()
export class DataRetrievalService {

  levelData$: BehaviorSubject<levelData>;

  constructor(private http: Http) {
    let levelData: levelData;
    this.levelData$ = new BehaviorSubject(levelData);
  }

  public setLevel = () => {
    return this.http.get("/assets/levels/senior-software-engineer.json")
      .map((res) => res.json())
      .subscribe((res) => this.levelData$.next(res))
  }
}

export interface levelData {
  role: string,
  distance: [any]
}
