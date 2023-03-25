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

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && control.touched);
  }
}

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
    MatExpansionModule
  ]
})
export class RegisterComponent {

  constructor(private scrumSignup: ScrumSignupService) {}

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  customMatcher = new CustomErrorStateMatcher();

  signUp() {
    if (this.signupForm.valid) {
      this.scrumSignup.signup(this.signupForm.value as SignupCredentials);
    }
  }

  resetErrorState(controlName: string) {
    if (this.signupForm.get(controlName)?.touched)
      this.signupForm.get(controlName)?.markAsUntouched();
  }

}
