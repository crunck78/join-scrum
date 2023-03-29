import { TestBed } from '@angular/core/testing';

import { ForgotPasswordInterceptorService } from './forgot-password-interceptor.service';

describe('ForgotPasswordInterceptorService', () => {
  let service: ForgotPasswordInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
