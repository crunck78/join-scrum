import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumApiService } from "../../scrum-api/scrum-api.service";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { UserResponse } from "../../shared/models/user.model";
import { EditProfileComponent } from "../../shared/shared-components/dialogs/edit-profile/edit-profile.component";
import { ProfileImageCropperComponent } from "../../shared/shared-components/image-cropper/image-cropper.component";

@Injectable({
	providedIn: "root",
})
export class ProfileService {
	private scrumProfile = inject(ScrumProfileService);
	private dialog = inject(MatDialog);
	private scrumApi = inject(ScrumApiService);

	get profile$() {
		return this.scrumProfile.getProfile$().pipe(take(1));
	}

	openEditProfileDialog(profileToEdit: UserResponse) {
		const dialogRef = this.dialog.open<
			EditProfileComponent,
			any,
			UserResponse | null
		>(EditProfileComponent);
		dialogRef.componentInstance.profileToEdit = profileToEdit.id ?? -1;
		dialogRef.componentInstance.editProfileForm.patchValue(
			profileToEdit as UserResponse,
		);

		return dialogRef.afterClosed().pipe(take(1));
	}

	deleteProfile() {
		this.scrumProfile
			.deleteProfile$()
			.pipe(take(1))
			.subscribe((isDeleted) => {
				if (isDeleted) this.scrumApi.logout();
			});
	}

	openProfileImageCropperDialog() {
		const dialogRef = this.dialog.open<
			ProfileImageCropperComponent,
			any,
			boolean
		>(ProfileImageCropperComponent);
		return dialogRef.afterClosed().pipe(take(1));
	}
}
