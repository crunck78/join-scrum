import { TestBed } from '@angular/core/testing';

import { TasksInterceptorService } from './tasks-interceptor.service';

describe('TasksInterceptorService', () => {
  let service: TasksInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
