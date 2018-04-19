import { TestBed, inject } from '@angular/core/testing';

import { CharPositionOnScreenService } from './char-position-on-screen.service';

describe('CharPositionOnScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharPositionOnScreenService]
    });
  });

  it('should be created', inject([CharPositionOnScreenService], (service: CharPositionOnScreenService) => {
    expect(service).toBeTruthy();
  }));
});
