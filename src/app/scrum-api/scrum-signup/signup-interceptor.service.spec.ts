import { TestBed } from '@angular/core/testing';

import { SignupInterceptorService } from './signup-interceptor.service';

describe('SignupInterceptorService', () => {
  let service: SignupInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
