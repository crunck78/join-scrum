import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMAIL_REGEX } from "../../../shared/shared-components/form-field/form-field.component";
import { RegisterModule } from "./register.module";
import { RegisterService } from "./register.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	imports: [RegisterModule],
})
export class RegisterComponent {
	private registerService = inject(RegisterService);

	signupForm = new FormGroup({
		name: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
		email: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
		}),
		password: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	constructor() {
		this.signupForm.disable();
	}

	get mobile$() {
		return this.registerService.mobile$;
	}

	signUp() {
		if (this.signupForm.valid) {
			this.registerService.signUp(this.signupForm.getRawValue());
		}
	}
}
