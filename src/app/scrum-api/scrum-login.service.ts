import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_ENDPOINT } from './login-interceptor.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumLoginService {

  loginCredentials!: LoginCredentials;
  loginEndpoint = LOGIN_ENDPOINT;
  token!: string;
  constructor(private http: HttpClient) { }

  login() {
    this.http.post<ApiToken>(this.loginEndpoint, this.loginCredentials).pipe(
      catchError(err => of({ token: "" }))
    ).subscribe(response => {
      this.token = response.token;
    });
  }
}
