import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOGIN_ENDPOINT } from './login-interceptor.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiToken, ScrumApiService } from '../scrum-api.service';
import { Router } from '@angular/router';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumLoginService {

  loginCredentials!: LoginCredentials;
  loginEndpoint = LOGIN_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService, private router: Router) { }

  login(credentials: LoginCredentials) {
    this.http.post<ApiToken>(this.loginEndpoint, credentials)
      .subscribe(
        {
          next: (response) => {
            console.log(response);
            this.scrumApi.apiToken$.next(response)
          },
          error: (error) => {
            console.log(error);
            this.scrumApi.apiToken$.next({token: ""})
          }
        }
      );
  }
}
