import { TestBed } from '@angular/core/testing';

import { BoardsInterceptorService } from './boards-interceptor.service';

describe('BoardsInterceptorService', () => {
  let service: BoardsInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
