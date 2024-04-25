import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';
import { User, UserRequest, UserResponse, UserResponseAPI } from 'src/app/shared/models/user.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const PROFILE_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/me/';
export const PROFILE_IMAGE_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/user-upload-image/';

export interface Profile {
  id?: number;
  email: string;
  name: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumProfileService {

  profileEndpoint = PROFILE_ENDPOINT;
  profile!: Profile;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getProfile$(): Observable<UserResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<UserResponseAPI>(this.profileEndpoint, options)
      .pipe(
        map(profile => profile ? User.createInternalValue(profile) : null),
        catchError(() => of(null))
      );
  }

  editProfile$(profile: Partial<UserRequest>, profileId: number): Observable<UserResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const editProfile = User.createRepresentation(profile);
    return this.http.patch<UserResponseAPI>(this.profileEndpoint, editProfile, options)
      .pipe(
        map((profile: UserResponseAPI | null) => profile ? User.createInternalValue(profile) : null),
        catchError(() => of(null))
      );
  }

  deleteProfile$(): Observable<boolean> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.delete<number | null>(this.profileEndpoint, options)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

}
