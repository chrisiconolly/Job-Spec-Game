import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataRetrievalService } from '../../services/data-retrieval/data-retrieval.service';

@Component({
  selector: 'level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router, private dataRetrievalService: DataRetrievalService) { }

  ngOnInit() {
    this.route.data.subscribe(((data) => {
      this.dataRetrievalService.setLevel(data.data);
    }))
  }

}
