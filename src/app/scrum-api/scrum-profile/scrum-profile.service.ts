import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PROFILE_ENDPOINT } from './profile-interceptor.service';

export interface Profile {
  email: string;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumProfileService {

  profileEndpoint = PROFILE_ENDPOINT;
  profile!: Profile;

  constructor(private http: HttpClient) { }

  getProfile() {
    this.http.get<Profile>(this.profileEndpoint)
      .subscribe(
        {
          next: (response : Profile) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }
}
