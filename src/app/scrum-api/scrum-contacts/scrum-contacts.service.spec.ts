import { TestBed } from '@angular/core/testing';

import { ScrumContactsService } from './scrum-contacts.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ScrumContactsService', () => {
  let service: ScrumContactsService;
  let httpS: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumContactsService);
    httpS = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
