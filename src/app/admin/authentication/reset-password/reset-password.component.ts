import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { ScrumSignupService, SignupCredentials } from 'src/app/scrum-api/scrum-signup/scrum-signup.service';
import { ResetPasswordCredentials, ScrumResetPasswordService } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
export class ResetPasswordComponent {

  constructor(private scrumResetPassword: ScrumResetPasswordService,
    private breakPoints: BreakpointsService) {}

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', Validators.compose([Validators.required])),
    confirmedPassword: new FormControl('', Validators.compose([Validators.required])),
  });

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('confirmedPassword') as FormControl;
      this.scrumResetPassword.resetPassword(newPassword.value as ResetPasswordCredentials);
    }
  }

  matches(left: FormControl ,right: FormControl){
    return (left: FormControl) => {
        right.valueChanges.subscribe(value => left.value == right )
    }
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }

}
