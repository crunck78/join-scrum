import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import type { SignupCredentials } from "src/app/scrum-api/scrum-signup/scrum-signup.service";
import { EMAIL_REGEX } from "src/app/shared/shared-components/form-field/form-field.component";
import { RegisterModule } from "./register.module";
import type { RegisterService } from "./register.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	imports: [RegisterModule],
})
export class RegisterComponent {
	signupForm = new FormGroup({
		name: new FormControl("", Validators.compose([Validators.required])),
		email: new FormControl(
			"",
			Validators.compose([
				Validators.required,
				Validators.pattern(EMAIL_REGEX),
			]),
		),
		password: new FormControl("", Validators.compose([Validators.required])),
	});

	constructor(private registerService: RegisterService) {
		this.signupForm.disable();
	}

	get mobile$() {
		return this.registerService.breakPoints.mobile$;
	}

	signUp() {
		if (this.signupForm.valid) {
			this.registerService.scrumSignup.signup(
				this.signupForm.value as SignupCredentials,
			);
		}
	}
}
