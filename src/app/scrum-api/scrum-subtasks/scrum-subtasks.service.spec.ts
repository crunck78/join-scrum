import { TestBed } from '@angular/core/testing';

import { ScrumSubtasksService } from './scrum-subtasks.service';

describe('ScrumSubtasksService', () => {
  let service: ScrumSubtasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumSubtasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
