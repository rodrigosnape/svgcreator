import { TestBed } from '@angular/core/testing';

import { DesenhoService } from './desenho.service';

describe('DesenhoService', () => {
  let service: DesenhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesenhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
