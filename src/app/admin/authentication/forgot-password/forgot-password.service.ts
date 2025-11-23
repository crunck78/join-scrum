import { Injectable, inject } from "@angular/core";
import { ScrumForgotPasswordService } from "src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service";
import { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class ForgotPasswordService {
	scrumForgotPassword = inject(ScrumForgotPasswordService);
	private breakPoints = inject(BreakpointsService);
	feedbackService = inject(FeedbackService);

	get mobile$() {
		return this.breakPoints.mobile$;
	}
}
