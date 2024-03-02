import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LogInModule } from './log-in.module';
import { LogInService } from './log-in.service';
import { LoginCredentials } from 'src/app/scrum-api/scrum-login/scrum-login.service';
import { EMAIL_REGEX } from 'src/app/shared/shared-components/form-field/form-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

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
  returnUrl!: string;

  constructor(
    private loginService: LogInService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.pipe(take(1)).subscribe(params => this.returnUrl = params['returnUrl'] || '');
    this.rememberMe.valueChanges.subscribe(value => this.loginService.scrumApi.rememberMe = value as boolean)
  }

  login() {
    if (!this.loginForm.valid)
      return;
    this.loginService.scrumLogin.login(this.loginForm.value as LoginCredentials)
      .pipe(take(1))
      .subscribe((isLogged => {
        if (!isLogged)
          return;
        this.router.navigate([this.returnUrl]);
      }));
  }

  guestLogin() {
    this.loginService.scrumLogin.guestLogin()
      .pipe(take(1))
      .subscribe((isLogged => {
        if (!isLogged)
          return;
        this.router.navigate([this.returnUrl]);
      }));
  }

  get mobile$() {
    return this.loginService.breakPoints.mobile$;
  }
}
