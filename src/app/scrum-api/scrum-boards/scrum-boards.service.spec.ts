import { TestBed } from '@angular/core/testing';

import { ScrumBoardsService } from './scrum-boards.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumBoardsService', () => {
  let service: ScrumBoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumBoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
