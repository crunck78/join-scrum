import { Injectable, inject } from "@angular/core";
import { take } from "rxjs";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { ScrumSummaryService } from "../../scrum-api/scrum-summary/scrum-summary.service";

@Injectable({
	providedIn: "root",
})
export class SummaryService {
	private scrumSummary = inject(ScrumSummaryService);
	private scrumProfile = inject(ScrumProfileService);

	get profile$() {
		return this.scrumProfile.getProfile$().pipe(take(1));
	}

	get summary$() {
		return this.scrumSummary.getSummary$().pipe(take(1));
	}
}
