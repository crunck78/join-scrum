import { Injectable, inject } from "@angular/core";
import { take } from "rxjs";
import {
	ForgotPasswordCredentials,
	ScrumForgotPasswordService,
} from "../../../scrum-api/scrum-forgot-password/scrum-forgot-password.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class ForgotPasswordService {
	private scrumForgotPassword = inject(ScrumForgotPasswordService);
	private breakPoints = inject(BreakpointsService);
	private feedbackService = inject(FeedbackService);

	get mobile$() {
		return this.breakPoints.mobile$;
	}

	sendMail(credentials: ForgotPasswordCredentials) {
		this.scrumForgotPassword
			.sendMail$(credentials)
			.pipe(take(1))
			.subscribe((isSend) => {
				if (isSend)
					this.feedbackService.openSnackBar(
						"Reset Password E-mail was send!",
						"Close",
					);
			});
	}
}
