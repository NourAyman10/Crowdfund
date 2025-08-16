import { TestBed } from '@angular/core/testing';

import { CampainDetailsService } from './campain-details.service';

describe('CampainDetailsService', () => {
  let service: CampainDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampainDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
