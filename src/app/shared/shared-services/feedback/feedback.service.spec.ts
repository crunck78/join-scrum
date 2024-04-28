import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(MaterialModule)
      ]
    });
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
