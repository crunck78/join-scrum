import { Component } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumProfileService } from "src/app/scrum-api/scrum-profile/scrum-profile.service";
import { UserRequest } from "src/app/shared/models/user.model";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { DialogComponent } from "../../dialog/dialog.component";
import { FormFieldComponent } from "../../form-field/form-field.component";
import { LogoComponent } from "../../logo/logo.component";

@Component({
	selector: "app-edit-profile",
	imports: [
		DialogComponent,
		LogoComponent,
		MaterialModule,
		FormFieldComponent,
		ReactiveFormsModule,
	],
	templateUrl: "./edit-profile.component.html",
	styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent {
	constructor(
		private scrumProfile: ScrumProfileService,
		private dialogRef: MatDialogRef<EditProfileComponent>,
	) {}

	editProfileForm = new FormGroup({
		name: new FormControl("", Validators.compose([Validators.required])),
		email: new FormControl(
			"",
			Validators.compose([Validators.required, Validators.email]),
		),
	});

	profileToEdit!: number;

	editProfile() {
		if (!this.editProfileForm.valid) return;
		this.scrumProfile
			.editProfile$(
				this.editProfileForm.value as Partial<UserRequest>,
				this.profileToEdit,
			)
			.pipe(take(1))
			.subscribe((res) => this.dialogRef.close(res));
	}
}
