import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {
  constructor(private scrumApi: ScrumApiService, private router: Router) { }
  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.scrumApi.apiToken$.getValue();

    if (token && token.token !== '') {
      // Token is not empty, allow access
      return true;
    }

    // Token is empty, redirect to login page
    this.router.navigate(['/auth']);
    return false;

  }

}

export function loginGuardFactory(loginGuard: LogInGuard) {
  return () => loginGuard.canActivate();
}
