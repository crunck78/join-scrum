import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginCredentials, ScrumLoginService } from 'src/app/scrum-api/scrum-login/scrum-login.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { ForgotPasswordCredentials, ScrumForgotPasswordService } from 'src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent, PageTitleComponent,
    MatInputModule, MatFormFieldModule, MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatExpansionModule,
    FormFieldComponent,
  ]
})
export class ForgotPasswordComponent {

  constructor(private scrumForgotPassword: ScrumForgotPasswordService){}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
  });

  sendMail(){
    if (this.forgotPasswordForm.valid) {
      this.scrumForgotPassword.sendMail(this.forgotPasswordForm.value as ForgotPasswordCredentials);
    }
  }

}
