import { TestBed } from '@angular/core/testing';

import { BienServiceService } from './bien-service.service';

describe('BienServiceService', () => {
  let service: BienServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BienServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
