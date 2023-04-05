import { TestBed } from '@angular/core/testing';

import { ContactsInterceptorService } from './contacts-interceptor.service';

describe('ContactsInterceptorService', () => {
  let service: ContactsInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
