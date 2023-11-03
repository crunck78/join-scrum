import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  matchesWebBreakpoint$: Observable<boolean>;
  mobile$: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.matchesWebBreakpoint$ = this.breakpointObserver
      .observe([Breakpoints.Web])
      .pipe(
        map(result => result.matches),
      );

    this.mobile$ = this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }
}
