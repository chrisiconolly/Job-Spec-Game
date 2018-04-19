import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BushComponent } from './bush.component';

describe('BushComponent', () => {
  let component: BushComponent;
  let fixture: ComponentFixture<BushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
