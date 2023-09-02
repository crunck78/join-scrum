import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScrumApiService } from '../scrum-api.service';
import { FORGOT_PASSWORD_ENDPOINT } from './forgot-password-interceptor.service';

export interface ForgotPasswordCredentials{
  email: string
}



@Injectable({
  providedIn: 'root'
})
export class ScrumForgotPasswordService {

  forgotPasswordEndpoint = FORGOT_PASSWORD_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  sendMail(credentials: ForgotPasswordCredentials) {
    this.http.post<any>(this.forgotPasswordEndpoint, credentials).pipe(
      catchError(err => of(err))
    ).subscribe(response => {
      console.log(response);
    });
  }
}
