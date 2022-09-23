import { TestBed } from '@angular/core/testing';

import { ApiDataBindService } from './api-data-bind.service';

describe('ApiDataBindService', () => {
  let service: ApiDataBindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDataBindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
