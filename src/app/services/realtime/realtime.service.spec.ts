import { TestBed } from '@angular/core/testing';

import { RealtimeService } from './realtime.service';

describe('RealtimeServiceTsService', () => {
  let service: RealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
