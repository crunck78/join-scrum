import { TestBed } from '@angular/core/testing';

import { ScrumLoginService } from './scrum-login.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

describe('ScrumLoginService', () => {
  let service: ScrumLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule, MaterialModule)
      ]
    });
    service = TestBed.inject(ScrumLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
