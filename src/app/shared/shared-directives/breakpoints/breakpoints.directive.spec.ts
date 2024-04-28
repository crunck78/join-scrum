import { TestBed } from '@angular/core/testing';
import { BreakpointsService } from '../../shared-services/breakpoints/breakpoints.service';
import { BreakpointsDirective } from './breakpoints.directive';

describe('BreakpointsDirective', () => {
  let service: BreakpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointsService);
  });

  it('should create an instance', () => {
    const directive = new BreakpointsDirective(service);
    expect(directive).toBeTruthy();
  });
});
