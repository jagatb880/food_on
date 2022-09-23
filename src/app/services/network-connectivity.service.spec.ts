import { TestBed } from '@angular/core/testing';

import { NetworkConnectivityService } from './network-connectivity.service';

describe('NetworkConnectivityService', () => {
  let service: NetworkConnectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkConnectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
