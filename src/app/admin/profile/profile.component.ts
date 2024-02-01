import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScrumProfileService } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { UserResponse } from 'src/app/shared/models/user.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { ContactInitialsComponent } from 'src/app/shared/shared-components/contact-initials/contact-initials.component';
import { EditProfileComponent } from 'src/app/shared/shared-components/dialogs/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.scss'],
  imports: [CardComponent, MaterialModule, ContactInitialsComponent]
})
export class ProfileComponent {

  profile!: UserResponse | null;
  constructor(private scrumProfile: ScrumProfileService, private dialog: MatDialog) {
    this.scrumProfile.getProfile$().subscribe({
      next: (p) => this.profile = p,
      error: (e) => console.log(e)
    })
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
    throw new Error('Method not implemented.');
  }
}
