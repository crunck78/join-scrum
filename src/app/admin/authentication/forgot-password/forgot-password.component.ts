import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ForgotPasswordModule } from './forgot-password.module';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordCredentials } from 'src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service';

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

  constructor(private forgotPasswordService: ForgotPasswordService){}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
  });

  sendMail(){
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordService.scrumForgotPassword.sendMail(this.forgotPasswordForm.value as ForgotPasswordCredentials);
    }
  }

  get matchWebBreakpoint$ (){
    return this.forgotPasswordService.breakPoints.matchesWebBreakpoint$;
  }

}
