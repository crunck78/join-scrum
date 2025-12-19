import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ForgotPasswordModule } from "./forgot-password.module";
import { ForgotPasswordService } from "./forgot-password.service";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
	imports: [ForgotPasswordModule],
})
export class ForgotPasswordComponent {
	private service = inject(ForgotPasswordService);

	forgotPasswordForm = new FormGroup({
		email: new FormControl<string>("", {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
	});

	constructor() {
		// This functionality is disabled for now, as only guests users can use the application.
		this.forgotPasswordForm.disable();
	}

	get mobile$() {
		return this.service.mobile$;
	}

	sendMail() {
		if (this.forgotPasswordForm.valid) {
			this.service.sendMail(this.forgotPasswordForm.getRawValue());
		}
	}
}
