import { TestBed, inject } from '@angular/core/testing';

import { LerpService } from './lerp.service';

describe('LerpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LerpService]
    });
  });

  it('should be created', inject([LerpService], (service: LerpService) => {
    expect(service).toBeTruthy();
  }));
});
