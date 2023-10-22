import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModule } from './register.module';
import { RegisterService } from './register.service';
import { SignupCredentials } from 'src/app/scrum-api/scrum-signup/scrum-signup.service';
import { EMAIL_REGEX } from 'src/app/shared/shared-components/form-field/form-field.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    RegisterModule
  ]
})
export class RegisterComponent {

  constructor(private registerService: RegisterService) {}

  signupForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  signUp() {
    if (this.signupForm.valid) {
      this.registerService.scrumSignup.signup(this.signupForm.value as SignupCredentials);
    }
  }

}
