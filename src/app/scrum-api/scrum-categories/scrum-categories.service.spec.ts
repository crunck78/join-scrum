import { TestBed } from '@angular/core/testing';

import { ScrumCategoriesService } from './scrum-categories.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ScrumCategoriesService', () => {
  let service: ScrumCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    });
    service = TestBed.inject(ScrumCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
