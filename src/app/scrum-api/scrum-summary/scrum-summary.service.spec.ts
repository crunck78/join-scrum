import { TestBed } from '@angular/core/testing';

import { ScrumSummaryService } from './scrum-summary.service';

describe('ScrumSummaryService', () => {
  let service: ScrumSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
