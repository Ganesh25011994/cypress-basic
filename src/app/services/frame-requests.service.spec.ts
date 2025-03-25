import { TestBed } from '@angular/core/testing';

import { FrameRequestsService } from './frame-requests.service';

describe('FrameRequestsService', () => {
  let service: FrameRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
