import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ScrumApiService } from 'src/app/scrum-api/scrum-api.service';
import { ScrumProfileService } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { UserResponse } from 'src/app/shared/models/user.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { ContactInitialsComponent } from 'src/app/shared/shared-components/contact-initials/contact-initials.component';
import { EditProfileComponent } from 'src/app/shared/shared-components/dialogs/edit-profile/edit-profile.component';
import { ProfileImageCropperComponent } from 'src/app/shared/shared-components/image-cropper/image-cropper.component';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.scss'],
  imports: [
    CardComponent,
    MaterialModule,
    ContactInitialsComponent,
    ProfileImageCropperComponent
  ]
})
export class ProfileComponent {

  profile!: UserResponse | null;
  constructor(
    private scrumProfile: ScrumProfileService,
    private dialog: MatDialog,
    private scrumApi: ScrumApiService,
    private feedbackService: FeedbackService
  ) {
    this.scrumProfile.getProfile$()
      .pipe(take(1))
      .subscribe((p) => this.profile = p);
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent);
    dialogRef.componentInstance.profileToEdit = this.profile?.id ?? -1;
    dialogRef.componentInstance.editProfileForm.patchValue(this.profile as UserResponse);

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.profile = res;
    });
  }

  deactivateProfile() {
    throw new Error('Method not implemented.');
  }

  deleteProfile() {
    this.scrumProfile.deleteProfile$()
      .pipe(take(1))
      .subscribe((isDeleted) => {
        if (isDeleted)
          this.scrumApi.apiToken$.next({ token: '' })
      });
  }

  changeImg() {
    this.dialog.open(ProfileImageCropperComponent);
  }
}
