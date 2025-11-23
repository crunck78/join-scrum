import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class HeaderService {
	scrumApi = inject(ScrumApiService);
	breakPoints = inject(BreakpointsService);
	router = inject(Router);

	logout() {
		this.scrumApi.logout();
	}
}
