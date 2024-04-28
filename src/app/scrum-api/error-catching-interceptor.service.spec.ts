import { TestBed } from '@angular/core/testing';

import { ErrorCatchingInterceptor } from './error-catching-interceptor.service';
import { provideRouter } from '@angular/router';
import { routes } from '../shared/routes';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../shared/modules/material/material.module';

describe('ErrorCatchingInterceptorService', () => {
  let service: ErrorCatchingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorCatchingInterceptor,
        provideRouter(routes),
        importProvidersFrom(MaterialModule)
      ]
    });
    service = TestBed.inject(ErrorCatchingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
