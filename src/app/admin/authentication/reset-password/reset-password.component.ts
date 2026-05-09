import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResetPasswordModule } from "./reset-password.module";
import { ResetPasswordService } from "./reset-password.service";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	imports: [ResetPasswordModule],
})
export class ResetPasswordComponent {
	private resetPasswordService = inject(ResetPasswordService);

	resetPasswordForm = new FormGroup({
		password: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
		confirmedPassword: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	resetPassword() {
		if (!this.resetPasswordForm.valid) return;
		const newPassword = this.resetPasswordForm.getRawValue().password;
		this.resetPasswordService.resetPassword(newPassword);
	}
}
