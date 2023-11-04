import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_ENDPOINT } from './login-interceptor.service';
import { ApiToken, ScrumApiService } from '../scrum-api.service';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';

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

  constructor(private http: HttpClient,
    private scrumApi: ScrumApiService,
    private feedback: FeedbackService
  ) { }

  login(credentials: LoginCredentials) {
    this.http.post<ApiToken>(this.loginEndpoint, credentials)
      .subscribe(
        {
          next: (response) => {
            this.scrumApi.apiToken$.next(response);
            this.feedback.openSnackBar();
          },
          error: () => this.scrumApi.apiToken$.next({ token: "" })
        }
      );
  }
}
