import { TestBed } from '@angular/core/testing';

import { CategoriesInterceptor } from './categories-interceptor.service';

describe('CategoriesInterceptor', () => {
  let service: CategoriesInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
