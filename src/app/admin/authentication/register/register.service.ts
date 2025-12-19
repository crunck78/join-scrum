import { Injectable, inject } from "@angular/core";
import {
	ScrumSignupService,
	SignupCredentials,
} from "../../../scrum-api/scrum-signup/scrum-signup.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class RegisterService {
	private scrumSignup = inject(ScrumSignupService);
	private breakPoints = inject(BreakpointsService);

	signUp(signUpCredentials: SignupCredentials) {
		this.scrumSignup.signup(signUpCredentials);
	}

	get mobile$() {
		return this.breakPoints.mobile$;
	}
}
