import { TestBed } from '@angular/core/testing';

import { ScrumSubtasksService } from './scrum-subtasks.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumSubtasksService', () => {
  let service: ScrumSubtasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumSubtasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
