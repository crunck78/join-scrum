import { TestBed } from '@angular/core/testing';

import { ScrumContactsService } from './scrum-contacts.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumContactsService', () => {
  let service: ScrumContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
