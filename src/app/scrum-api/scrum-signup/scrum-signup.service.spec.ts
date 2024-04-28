import { TestBed } from '@angular/core/testing';

import { ScrumSignupService } from './scrum-signup.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

describe('ScrumSignupService', () => {
  let service: ScrumSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule, MaterialModule)
      ]
    });
    service = TestBed.inject(ScrumSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
