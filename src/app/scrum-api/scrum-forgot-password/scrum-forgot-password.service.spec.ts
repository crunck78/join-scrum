import { TestBed } from '@angular/core/testing';

import { ScrumForgotPasswordService } from './scrum-forgot-password.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

describe('ScrumForgotPasswordService', () => {
  let service: ScrumForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule, MaterialModule)
      ]
    });
    service = TestBed.inject(ScrumForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
