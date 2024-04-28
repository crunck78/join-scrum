import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { canActivate } from './log-in.guard';

describe('LogInGuard', () => {
  let guard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = canActivate
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
