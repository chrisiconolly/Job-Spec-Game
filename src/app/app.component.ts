import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: ILevel;
  public role: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get<ILevel>('/assets/levels/senior-software-engineer.json')
      .subscribe((res: ILevel) => {
        this.role = res.role;
        this.data = res;
      },
      error => console.log(error));
  }
}
