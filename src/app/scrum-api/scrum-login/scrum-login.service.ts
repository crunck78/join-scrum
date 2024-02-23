import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_ENDPOINT } from './login-interceptor.service';
import { ApiToken, ScrumApiService } from '../scrum-api.service';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';
import { catchError, map, of, take, tap, throwError } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}


export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumLoginService {

  loginCredentials!: LoginCredentials;
  loginEndpoint = LOGIN_ENDPOINT;

  constructor(private http: HttpClient,
    private scrumApi: ScrumApiService,
    private feedback: FeedbackService
  ) { }

  login(credentials: LoginCredentials) {
    return this.http.post<ApiToken>(this.loginEndpoint, credentials).pipe(
      tap((response) => this.scrumApi.apiToken$.next(response)),
      catchError(() => of(false)),
      map(() => true)
    );
  }
}
