import { TestBed } from '@angular/core/testing';

import { ErrorCatchingInterceptor } from './error-catching-interceptor.service';

describe('ErrorCatchingInterceptorService', () => {
  let service: ErrorCatchingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCatchingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
