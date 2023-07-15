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
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints.service';

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
    MatExpansionModule,
    FormFieldComponent,
  ]
})
export class LogInComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });
  rememberMe = new FormControl(this.scrumApi.rememberMe);

  constructor(private scrumLogin: ScrumLoginService,
    private scrumApi: ScrumApiService,
    private breakPoints: BreakpointsService) {
    this.rememberMe.valueChanges.subscribe(value => this.scrumApi.rememberMe = value as boolean)
  }

  login() {
    if (this.loginForm.valid) {
      this.scrumLogin.login(this.loginForm.value as LoginCredentials);
    }
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }
}
