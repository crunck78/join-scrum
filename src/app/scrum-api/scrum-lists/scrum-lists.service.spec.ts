import { TestBed } from '@angular/core/testing';

import { ScrumListsService } from './scrum-lists.service';

describe('ScrumListsService', () => {
  let service: ScrumListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
