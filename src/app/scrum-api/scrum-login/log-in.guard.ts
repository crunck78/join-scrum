import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ScrumApiService } from '../scrum-api.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const scrumApi = inject(ScrumApiService);

  if (scrumApi.isLoggedIn()) {
    return true;
  }

  router.navigate(['/auth/log-in'], { queryParams: { returnUrl: state.url } });
  return false;
};
