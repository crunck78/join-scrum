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
import { EMAIL_REGEX, FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {

  constructor(private scrumSignup: ScrumSignupService, private breakPoints: BreakpointsService) {}

  signupForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  signUp() {
    if (this.signupForm.valid) {
      this.scrumSignup.signup(this.signupForm.value as SignupCredentials);
    }
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }

}
