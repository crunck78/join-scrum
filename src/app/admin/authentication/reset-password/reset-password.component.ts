import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordModule } from './reset-password.module';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordCredentials } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    ResetPasswordModule
  ]
})
export class ResetPasswordComponent {

  constructor(private resetPasswordService: ResetPasswordService) {}

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', Validators.compose([Validators.required])),
    confirmedPassword: new FormControl('', Validators.compose([Validators.required])),
  });

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('confirmedPassword') as FormControl;
      this.resetPasswordService.scrumResetPassword.resetPassword(newPassword.value as ResetPasswordCredentials);
    }
  }

  matches(left: FormControl ,right: FormControl){
    return (left: FormControl) => {
        right.valueChanges.subscribe(() => left.value == right )
    }
  }

}
