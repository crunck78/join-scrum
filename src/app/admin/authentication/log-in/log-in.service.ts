import { Injectable, inject } from "@angular/core";
import { ScrumApiService } from "../../../scrum-api/scrum-api.service";
import { ScrumLoginService } from "../../../scrum-api/scrum-login/scrum-login.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";
@Injectable({
	providedIn: "root",
})
export class LogInService {
	scrumLogin = inject(ScrumLoginService);
	scrumApi = inject(ScrumApiService);
	breakPoints = inject(BreakpointsService);
	feedbackService = inject(FeedbackService);
}
