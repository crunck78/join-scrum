import { TestBed } from '@angular/core/testing';

import { ListsInterceptorService } from './lists-interceptor.service';

describe('ListsInterceptorService', () => {
  let service: ListsInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
