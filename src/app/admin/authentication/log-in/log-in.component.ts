import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMAIL_REGEX } from "../../../shared/shared-components/form-field/form-field.component";
import { LogInModule } from "./log-in.module";
import { LogInService } from "./log-in.service";

@Component({
	selector: "app-log-in",
	templateUrl: "./log-in.component.html",
	styleUrls: ["./log-in.component.scss"],
	imports: [LogInModule],
})
export class LogInComponent {
	private loginService = inject(LogInService);

	loginForm = new FormGroup({
		email: new FormControl("", {
			nonNullable: true,
			validators: Validators.compose([
				Validators.required,
				Validators.pattern(EMAIL_REGEX),
			]),
		}),
		password: new FormControl("", {
			nonNullable: true,
			validators: Validators.required,
		}),
	});
	rememberMe = new FormControl<boolean>(this.loginService.rememberMe, {
		nonNullable: true,
	});

	constructor() {
		this.rememberMe.valueChanges.subscribe(
			(value) => (this.loginService.rememberMe = value),
		);
		// Disable the form initially to prevent user interaction until ready
		this.loginForm.disable();
	}

	login() {
		if (!this.loginForm.valid) return;
		this.loginService.login(this.loginForm.getRawValue());
	}

	guestLogin() {
		this.loginService.guestLogin();
	}

	get mobile$() {
		return this.loginService.mobile$;
	}
}
