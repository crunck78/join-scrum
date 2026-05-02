import { Injectable, inject } from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { map } from "rxjs";
import { ApiToken, ScrumApiService } from "./scrum-api/scrum-api.service";
import { BreakpointsService } from "./shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class AppService {
	private scrumApi = inject(ScrumApiService);
	private breakPoints = inject(BreakpointsService);

	get web$() {
		return this.breakPoints.matchesWebBreakpoint$.pipe(
			map((matches) => (matches ? "side" : ("over" as MatDrawerMode))),
		);
	}

	get isLoggedIn$() {
		return this.scrumApi.apiToken$.pipe(
			map((apiToken: ApiToken) => !!apiToken.token),
		);
	}
}
