import { TestBed } from '@angular/core/testing';

import { ScrumCategoriesService } from './scrum-categories.service';

describe('ScrumCategoriesService', () => {
  let service: ScrumCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
