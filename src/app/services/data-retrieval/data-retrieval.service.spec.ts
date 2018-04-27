import { TestBed, inject } from '@angular/core/testing';

import { DataRetrievalService } from './data-retrieval.service';

describe('DataRetrievalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataRetrievalService]
    });
  });

  it('should be created', inject([DataRetrievalService], (service: DataRetrievalService) => {
    expect(service).toBeTruthy();
  }));
});
