import { TestBed } from '@angular/core/testing';

import { ScrumSignupService } from './scrum-signup.service';

describe('ScrumSignupService', () => {
  let service: ScrumSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
