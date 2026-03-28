import { Component, inject, OnInit } from "@angular/core";
import { UserResponse } from "../../shared/models/user.model";
import { ProfileModule } from "./profile.module";
import { ProfileService } from "./profile.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	imports: [ProfileModule],
})
export class ProfileComponent implements OnInit {
	private profileService = inject(ProfileService);

	profile!: UserResponse | null;

	ngOnInit() {
		this.refreshProfile();
	}

	refreshProfile() {
		this.profileService.profile$.subscribe((p) => (this.profile = p));
	}

	editProfile() {
		if (!this.profile) return;
		const dialogRefAfterClosed = this.profileService.openEditProfileDialog(
			this.profile,
		);
		dialogRefAfterClosed.subscribe((contactEdited) => {
			if (contactEdited) {
				this.refreshProfile();
			}
		});
	}

	deactivateProfile() {
		throw new Error("Method not implemented.");
	}

	deleteProfile() {
		this.profileService.deleteProfile();
	}

	changeImg() {
		const dialogRefAfterClosed =
			this.profileService.openProfileImageCropperDialog();
		dialogRefAfterClosed.subscribe((isChanged) => {
			if (isChanged) this.refreshProfile();
		});
	}
}
