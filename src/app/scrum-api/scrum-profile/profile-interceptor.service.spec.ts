import { TestBed } from '@angular/core/testing';

import { ProfileInterceptor } from './profile-interceptor.service';

describe('ProfileInterceptorService', () => {
  let service: ProfileInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
