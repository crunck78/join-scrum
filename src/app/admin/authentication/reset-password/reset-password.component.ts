import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordModule } from './reset-password.module';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordCredentials } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take } from 'rxjs';

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
  constructor(private resetPasswordService: ResetPasswordService, private route: ActivatedRoute) {
    this.route.queryParams.pipe(take(1))
      .subscribe(params => this.token = params['token']);
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', Validators.compose([Validators.required])),
    confirmedPassword: new FormControl('', Validators.compose([Validators.required]))
  });

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('password') as FormControl;
      this.resetPasswordService
        .scrumResetPassword
        .resetPassword({ password: newPassword.value, token: this.token } as ResetPasswordCredentials)
        .pipe(take(1))
        .subscribe({
          next: (value) => console.log(value),
          error: (err) => console.error(err)
        })
    }
  }

  matches(left: FormControl, right: FormControl) {
    return (left: FormControl) => {
      right.valueChanges.subscribe(() => left.value == right)
    }
  }

}
