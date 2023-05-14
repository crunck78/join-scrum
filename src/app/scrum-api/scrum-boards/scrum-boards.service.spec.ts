import { TestBed } from '@angular/core/testing';

import { ScrumBoardsService } from './scrum-boards.service';

describe('ScrumBoardsService', () => {
  let service: ScrumBoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumBoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
