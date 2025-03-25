import { TestBed } from '@angular/core/testing';

import { DataUtilityService } from './data-utility.service';

describe('DataUtilityService', () => {
  let service: DataUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
