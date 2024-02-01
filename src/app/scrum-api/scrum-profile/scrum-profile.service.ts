import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';
import { User, UserRequest, UserResponse, UserResponseAPI } from 'src/app/shared/models/user.model';

export const PROFILE_ENDPOINT = '/api/user/me/';

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

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<UserResponseAPI>(this.profileEndpoint, { headers })
      .pipe(
        catchError(() => of(null)),
        map(profile => profile ? User.createInternalValue(profile) : null)
      );
  }

  editProfile$(profile: Partial<UserRequest>, profileId: number): Observable<UserResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const editProfile = User.createRepresentation(profile);

    return this.http.patch<UserResponseAPI>(`${this.profileEndpoint}/`, editProfile, { headers })
      .pipe(
        catchError(() => of(null)),
        map((profile: UserResponseAPI | null) => profile ? User.createInternalValue(profile) : null)
      );
  }


}
