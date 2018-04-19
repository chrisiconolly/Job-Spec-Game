import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LondonBridgeComponent } from './london-bridge.component';

describe('LondonBridgeComponent', () => {
  let component: LondonBridgeComponent;
  let fixture: ComponentFixture<LondonBridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LondonBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LondonBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
