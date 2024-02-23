import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const scrumApi = inject(ScrumApiService);
  const token = scrumApi.apiToken$.getValue();

  if (token && token.token !== '') {
    return true;
  }

  router.navigate(['/auth/log-in'], { queryParams: { returnUrl: state.url } });
  return false;
};
