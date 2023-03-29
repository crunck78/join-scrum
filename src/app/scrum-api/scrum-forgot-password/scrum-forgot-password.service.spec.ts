import { TestBed } from '@angular/core/testing';

import { ScrumForgotPasswordService } from './scrum-forgot-password.service';

describe('ScrumForgotPasswordService', () => {
  let service: ScrumForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
