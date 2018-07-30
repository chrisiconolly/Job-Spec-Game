import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DataRetrievalService } from './services/data-retrieval/data-retrieval.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  role;
  data;

  constructor(private http: Http, private dataRetrievalService: DataRetrievalService) {
    dataRetrievalService.setLevel();
  }
}
