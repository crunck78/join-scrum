import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class BreakpointsService {
	private breakpointObserver = inject(BreakpointObserver);

	matchesWebBreakpoint$: Observable<boolean>;
	mobile$: Observable<boolean>;

	constructor() {
		this.matchesWebBreakpoint$ = this.breakpointObserver
			.observe([Breakpoints.Web])
			.pipe(map((result) => result.matches));

		this.mobile$ = this.breakpointObserver
			.observe([Breakpoints.XSmall])
			.pipe(map((result) => result.matches));
	}
}
