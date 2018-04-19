import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingTextComponent } from './floating-text.component';

describe('FloatingTextComponent', () => {
  let component: FloatingTextComponent;
  let fixture: ComponentFixture<FloatingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
