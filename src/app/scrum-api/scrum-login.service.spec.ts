import { TestBed } from '@angular/core/testing';

import { ScrumLoginService } from './scrum-login.service';

describe('ScrumLoginService', () => {
  let service: ScrumLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
