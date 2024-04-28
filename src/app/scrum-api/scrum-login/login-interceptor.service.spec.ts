import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './login-interceptor.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('LoginInterceptorService', () => {
  let service: LoginInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule),
      ]
    });
    service = TestBed.inject(LoginInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
