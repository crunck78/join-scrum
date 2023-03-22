import { TestBed } from '@angular/core/testing';

import { ScrumApiService } from './scrum-api.service';

describe('ScrumApiService', () => {
  let service: ScrumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
