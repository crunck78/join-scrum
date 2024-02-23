import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ScrumApiService } from '../scrum-api.service';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';

export const FORGOT_PASSWORD_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/password_reset/';

export interface ForgotPasswordCredentials {
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumForgotPasswordService {

  forgotPasswordEndpoint = FORGOT_PASSWORD_ENDPOINT;

  constructor(
    private http: HttpClient,
    private scrumApi: ScrumApiService,
    private feedbackService: FeedbackService) { }

  sendMail(credentials: ForgotPasswordCredentials) {
    this.http.post<any>(this.forgotPasswordEndpoint + `?email=${credentials.email}`, credentials)
      .pipe(take(1))
      .subscribe({
        next: () => this.feedbackService.openSnackBar('Reset Password E-mail was send!', 'Close'),
        error: () => this.feedbackService.openSnackBar('Reset Password E-mail could not be send!', 'Try again')
      });
  }
}
