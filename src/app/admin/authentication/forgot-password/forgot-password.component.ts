import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ForgotPasswordModule } from './forgot-password.module';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordCredentials } from 'src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    ForgotPasswordModule
  ]
})
export class ForgotPasswordComponent {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
  });

  constructor(private forgotPasswordService: ForgotPasswordService) {
    this.forgotPasswordForm.disable();
  }

  get mobile$() {
    return this.forgotPasswordService.mobile$;
  }

  sendMail() {
    if (this.forgotPasswordForm.valid)
      this.forgotPasswordService
        .scrumForgotPassword
        .sendMail(this.forgotPasswordForm.value as ForgotPasswordCredentials)
        .pipe(take(1))
        .subscribe(isSend => {
          if (isSend)
            this.forgotPasswordService.feedbackService.openSnackBar('Reset Password E-mail was send!', 'Close');
        });
  }
}
