import { TestBed } from '@angular/core/testing';

import { ResetPasswordInterceptorService } from './reset-password-interceptor.service';

describe('ResetPasswordInterceptorService', () => {
  let service: ResetPasswordInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
