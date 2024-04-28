import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let snackbarS: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(MaterialModule)
      ]
    });
    service = TestBed.inject(FeedbackService);
    snackbarS = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
