import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile, ScrumProfileService } from '../scrum-profile/scrum-profile.service';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';

export const SIGNUP_ENDPOINT = '/api/user/create/';

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

  constructor(private http: HttpClient,
    private scrumProfile: ScrumProfileService,
    private router: Router,
    private feedback: FeedbackService) { }

  signup(credentials: SignupCredentials) {
    this.http.post<Profile>(this.signupEndPoint, credentials)
      .subscribe(
        {
          next: (response: Profile) => {
            this.scrumProfile.profile = response;
            this.router.navigate(['/auth/log-in']);
            this.feedback.openSnackBar('Great Job! Successfully Signed Up!');
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }
}
