import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const PROFILE_ENDPOINT = '/api/user/me/';

export interface Profile {
  id?:number,
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
