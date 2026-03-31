import { Injectable, inject } from "@angular/core";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class HeaderService {
	private scrumApi = inject(ScrumApiService);
	private breakPoints = inject(BreakpointsService);

	logout() {
		this.scrumApi.logout();
	}

	get matchWebBreakpoint$() {
		return this.breakPoints.matchesWebBreakpoint$;
	}
}
