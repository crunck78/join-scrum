import { TestBed } from '@angular/core/testing';

import { ScrumListsService } from './scrum-lists.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumListsService', () => {
  let service: ScrumListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
