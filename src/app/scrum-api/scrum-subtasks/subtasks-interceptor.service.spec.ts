import { TestBed } from '@angular/core/testing';

import { SubtasksInterceptorService } from './subtasks-interceptor.service';

describe('SubtasksInterceptorService', () => {
  let service: SubtasksInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtasksInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
