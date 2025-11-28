import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumApiService } from "../../scrum-api/scrum-api.service";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { UserResponse } from "../../shared/models/user.model";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { CardComponent } from "../../shared/shared-components/card/card.component";
import { ContactInitialsComponent } from "../../shared/shared-components/contact-initials/contact-initials.component";
import { EditProfileComponent } from "../../shared/shared-components/dialogs/edit-profile/edit-profile.component";
import { ProfileImageCropperComponent } from "../../shared/shared-components/image-cropper/image-cropper.component";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	imports: [CardComponent, MaterialModule, ContactInitialsComponent],
})
export class ProfileComponent {
	private scrumProfile = inject(ScrumProfileService);
	private dialog = inject(MatDialog);
	private scrumApi = inject(ScrumApiService);

	profile!: UserResponse | null;

	constructor() {
		this.updateProfile();
	}

	updateProfile() {
		this.scrumProfile
			.getProfile$()
			.pipe(take(1))
			.subscribe((p) => (this.profile = p));
	}

	openEditProfileDialog() {
		const dialogRef = this.dialog.open(EditProfileComponent);
		dialogRef.componentInstance.profileToEdit = this.profile?.id ?? -1;
		dialogRef.componentInstance.editProfileForm.patchValue(
			this.profile as UserResponse,
		);

		dialogRef.afterClosed().subscribe((res) => {
			if (res) this.profile = res;
		});
	}

	deactivateProfile() {
		throw new Error("Method not implemented.");
	}

	deleteProfile() {
		this.scrumProfile
			.deleteProfile$()
			.pipe(take(1))
			.subscribe((isDeleted) => {
				if (isDeleted) this.scrumApi.logout();
			});
	}

	changeImg() {
		const dialogRef = this.dialog.open(ProfileImageCropperComponent);
		dialogRef.afterClosed().subscribe((isChanged) => {
			if (isChanged) this.updateProfile();
		});
	}
}
