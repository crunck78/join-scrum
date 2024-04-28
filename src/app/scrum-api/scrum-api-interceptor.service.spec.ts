import { TestBed } from '@angular/core/testing';

import { ScrumApiInterceptor } from './scrum-api-interceptor.service';

describe('ScrumApiInterceptorService', () => {
  let service: ScrumApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrumApiInterceptor
      ]
    });
    service = TestBed.inject(ScrumApiInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
