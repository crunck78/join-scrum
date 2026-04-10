import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import {
	ScrumSignupService,
	SignupCredentials,
} from "../../../scrum-api/scrum-signup/scrum-signup.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class RegisterService {
	private scrumSignup = inject(ScrumSignupService);
	private breakPoints = inject(BreakpointsService);
	private router = inject(Router);
	private feedback = inject(FeedbackService);

	signUp(signUpCredentials: SignupCredentials) {
		this.scrumSignup
			.signup$(signUpCredentials)
			.pipe(take(1))
			.subscribe((success) => {
				if (success) {
					this.router.navigate(["/auth/log-in"]);
					this.feedback.openSnackBar("Great Job! Successfully Signed Up!");
				} else {
					this.feedback.openSnackBar("Something went wrong!", "Try again");
				}
			});
	}

	get mobile$() {
		return this.breakPoints.mobile$;
	}
}
