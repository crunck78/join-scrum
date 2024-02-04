import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const RESET_PASSWORD_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/reset-password/';

export interface ResetPasswordCredentials {
  newPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumResetPasswordService {

  resetPasswordEndpoint = RESET_PASSWORD_ENDPOINT;

  constructor(private http: HttpClient) { }

  resetPassword(credentials: ResetPasswordCredentials) {
    this.http.post<any>(this.resetPasswordEndpoint, credentials).pipe(
      catchError(err => of(err))
    ).subscribe(response => {
      console.log(response);
    });
  }
}
