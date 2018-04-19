import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardComponent } from './shard.component';

describe('ShardComponent', () => {
  let component: ShardComponent;
  let fixture: ComponentFixture<ShardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
