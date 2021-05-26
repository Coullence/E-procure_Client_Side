import { TestBed } from '@angular/core/testing';

import { TenderReqService } from './tender-req.service';

describe('TenderReqService', () => {
  let service: TenderReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
