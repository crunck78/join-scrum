import { Injectable } from "@angular/core";
import type { ScrumApiService } from "src/app/scrum-api/scrum-api.service";
import type { ScrumLoginService } from "src/app/scrum-api/scrum-login/scrum-login.service";
import type { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";
import type { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";
@Injectable({
	providedIn: "root",
})
export class LogInService {
	constructor(
		public scrumLogin: ScrumLoginService,
		public scrumApi: ScrumApiService,
		public breakPoints: BreakpointsService,
		public feedbackService: FeedbackService,
	) {}
}
