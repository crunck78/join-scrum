import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordModule } from './reset-password.module';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordCredentials } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';

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
  token!: string;
  constructor(private resetPasswordService: ResetPasswordService, private route: ActivatedRoute, private feedbackService: FeedbackService) {
    this.route.queryParams.pipe(take(1))
      .subscribe(params => this.token = params['token']);
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', Validators.compose([Validators.required])),
    confirmedPassword: new FormControl('', Validators.compose([Validators.required]))
  });

  resetPassword() {
    if (!this.resetPasswordForm.valid)
      return;
    const newPassword = this.resetPasswordForm.get('password') as FormControl;
    this.resetPasswordService
      .scrumResetPassword
      .resetPassword({ password: newPassword.value, token: this.token } as ResetPasswordCredentials)
      .pipe(take(1))
      .subscribe((isReset => {
        if (isReset)
          this.feedbackService.openSnackBar("Password Reset Successfully", "Close");
      }));
  }

  matches(left: FormControl, right: FormControl) {
    return (left: FormControl) => {
      right.valueChanges.subscribe(() => left.value == right)
    }
  }
}
