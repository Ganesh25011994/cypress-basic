import { TestBed } from '@angular/core/testing';

import { CustomLoadingService } from './custom-loading.service';

describe('CustomLoadingService', () => {
  let service: CustomLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
