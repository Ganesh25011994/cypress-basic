import { TestBed } from '@angular/core/testing';

import { KarzaApiService } from './karza-api.service';

describe('KarzaApiService', () => {
  let service: KarzaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KarzaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
