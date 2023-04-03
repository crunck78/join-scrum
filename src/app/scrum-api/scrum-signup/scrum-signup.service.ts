import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiToken, ScrumApiService } from '../scrum-api.service';
import { SIGNUP_ENDPOINT } from './signup-interceptor.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Profile, ScrumProfileService } from '../scrum-profile/scrum-profile.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

  signup(credentials: SignupCredentials) {
    this.http.post<Profile>(this.signupEndPoint, credentials)
      .subscribe(
        {
          next: (response: Profile) => {
            this.scrumProfile.profile = response;
            this.router.navigate(['/auth/log-in']);
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }
}
