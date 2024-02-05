import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LogInModule } from './log-in.module';
import { LogInService } from './log-in.service';
import { LoginCredentials } from 'src/app/scrum-api/scrum-login/scrum-login.service';
import { EMAIL_REGEX } from 'src/app/shared/shared-components/form-field/form-field.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: true,
  imports: [
    LogInModule
  ]
})
export class LogInComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });
  rememberMe = new FormControl(this.loginService.scrumApi.rememberMe);

  constructor(
    private loginService: LogInService,
    private breakPoints: BreakpointsService
  ) {
    this.rememberMe.valueChanges.subscribe(value => this.loginService.scrumApi.rememberMe = value as boolean)
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.scrumLogin.login(this.loginForm.value as LoginCredentials);
    }
  }

  get mobile$() {
    return this.breakPoints.mobile$;
  }
}
