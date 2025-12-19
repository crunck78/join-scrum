import { Injectable, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { ScrumResetPasswordService } from "../../../scrum-api/scrum-reset-password/scrum-reset-password.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class ResetPasswordService {
	private scrumResetPassword = inject(ScrumResetPasswordService);
	private route = inject(ActivatedRoute);
	private feedbackService = inject(FeedbackService);
	token!: string;

	constructor() {
		this.route.queryParams
			.pipe(take(1))
			.subscribe((params) => (this.token = params["token"]));
	}

	resetPassword(newPassword: string) {
		this.scrumResetPassword
			.resetPassword({ password: newPassword, token: this.token })
			.pipe(take(1))
			.subscribe((isReset) => {
				if (isReset)
					this.feedbackService.openSnackBar(
						"Password Reset Successfully",
						"Close",
					);
			});
	}
}
