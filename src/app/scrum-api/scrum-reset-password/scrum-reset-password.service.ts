import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScrumApiService } from '../scrum-api.service';
import { RESET_PASSWORD_ENDPOINT } from './reset-password-interceptor.service';

export interface ResetPasswordCredentials {
  newPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumResetPasswordService {

  resetPasswordEndpoint = RESET_PASSWORD_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  resetPassword(credentials: ResetPasswordCredentials) {
    this.http.post<any>(this.resetPasswordEndpoint, credentials).pipe(
      catchError(err => of(err))
    ).subscribe(response => {
      console.log(response);
    });
  }
}
