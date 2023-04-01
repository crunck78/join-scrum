import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiToken, ScrumApiService } from '../scrum-api.service';
import { SIGNUP_ENDPOINT } from './signup-interceptor.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface SignupCredentials {
  name?: string
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumSignupService {

  signupCredentials!: SignupCredentials;
  signupEndPoint = SIGNUP_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  signup(credentials: SignupCredentials) {
    this.http.post<ApiToken>(this.signupEndPoint, credentials).pipe(
      catchError(err => of(err))
    ).subscribe(response => {
      //console.log(response)
    });
  }
}
