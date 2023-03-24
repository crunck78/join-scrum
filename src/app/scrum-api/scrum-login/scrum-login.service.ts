import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_ENDPOINT } from './login-interceptor.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiToken, ScrumApiService } from '../scrum-api.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumLoginService {

  loginCredentials!: LoginCredentials;
  loginEndpoint = LOGIN_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  login(credentials: LoginCredentials) {
    this.http.post<ApiToken>(this.loginEndpoint, credentials).pipe(
      catchError(err => of({ token: "" }))
    ).subscribe(response => {
      this.scrumApi.token = response.token;
    });
  }
}
