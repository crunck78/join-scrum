import { Injectable, inject } from "@angular/core";
import { ScrumApiService } from "src/app/scrum-api/scrum-api.service";
import { ScrumLoginService } from "src/app/scrum-api/scrum-login/scrum-login.service";
import { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";
@Injectable({
	providedIn: "root",
})
export class LogInService {
	scrumLogin = inject(ScrumLoginService);
	scrumApi = inject(ScrumApiService);
	breakPoints = inject(BreakpointsService);
	feedbackService = inject(FeedbackService);
}
