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
import { ScrumApiService } from 'src/app/scrum-api/scrum-api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && control.touched);
  }
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
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
export class LogInComponent {

  constructor(private scrumLogin: ScrumLoginService,
    private scrumApi: ScrumApiService) {
    this.rememberMe.valueChanges.subscribe(value => this.scrumApi.rememberMe = value as boolean)
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });
  rememberMe = new FormControl(this.scrumApi.rememberMe);
  customMatcher = new CustomErrorStateMatcher();

  login() {
    if (this.loginForm.valid) {
      this.scrumLogin.login(this.loginForm.value as LoginCredentials);
    }
  }

  resetErrorState(controlName: string) {
    if (this.loginForm.get(controlName)?.touched)
      this.loginForm.get(controlName)?.markAsUntouched();
  }
}
