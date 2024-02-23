import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';
import { ActivatedRoute } from '@angular/router';

export const RESET_PASSWORD_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/password_reset/confirm/';

export interface ResetPasswordCredentials {
  password: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumResetPasswordService {

  resetPasswordEndpoint = RESET_PASSWORD_ENDPOINT;
  token!: string;
  constructor(private http: HttpClient) {}

  resetPassword(credentials: ResetPasswordCredentials) {
    return this.http.post<any>(this.resetPasswordEndpoint, credentials).pipe(
      catchError(() => of(false)),
      map(()=> true)
    );
  }
}
