import { Injectable } from "@angular/core";
import type { ScrumForgotPasswordService } from "src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service";
import type { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";
import type { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class ForgotPasswordService {
	constructor(
		public scrumForgotPassword: ScrumForgotPasswordService,
		private breakPoints: BreakpointsService,
		public feedbackService: FeedbackService,
	) {}

	get mobile$() {
		return this.breakPoints.mobile$;
	}
}
