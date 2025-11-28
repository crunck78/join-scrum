import { Injectable, inject } from "@angular/core";
import { ScrumSignupService } from "../../../scrum-api/scrum-signup/scrum-signup.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class RegisterService {
	scrumSignup = inject(ScrumSignupService);
	breakPoints = inject(BreakpointsService);
}
