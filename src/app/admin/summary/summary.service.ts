import { Injectable, inject } from "@angular/core";
import { take } from "rxjs";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { ScrumSummaryService } from "../../scrum-api/scrum-summary/scrum-summary.service";
import { SummaryResponse } from "../../shared/models/summary.model";
import { UserResponse } from "../../shared/models/user.model";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "any",
})
export class SummaryService {
	breakPoints = inject(BreakpointsService);
	private scrumSummary = inject(ScrumSummaryService);
	private scrumProfile = inject(ScrumProfileService);

	summary!: SummaryResponse | null;
	profile!: UserResponse | null;

	constructor() {
		this.scrumSummary
			.getSummary$()
			.pipe(take(1))
			.subscribe((summary) => (this.summary = summary));
		this.scrumProfile
			.getProfile$()
			.pipe(take(1))
			.subscribe((profile) => (this.profile = profile));
	}

	get summaryEmpty() {
		if (!this.summary) return true;
		return (
			this.summary.tasksByCategory.length === 0 &&
			this.summary.tasksByPriority.length === 0 &&
			this.summary.tasksInLists.length === 0 &&
			this.summary.tasksInBacklog.count === 0
		);
	}
}
