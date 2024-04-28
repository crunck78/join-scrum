import { TestBed } from '@angular/core/testing';

import { ScrumSummaryService } from './scrum-summary.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumSummaryService', () => {
  let service: ScrumSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
