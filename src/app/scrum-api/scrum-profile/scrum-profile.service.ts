import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PROFILE_ENDPOINT } from './profile-interceptor.service';

export interface Profile{

}

@Injectable({
  providedIn: 'root'
})
export class ScrumProfileService {

  profileEndpoint = PROFILE_ENDPOINT;

  constructor(private http: HttpClient) { }

  getProfile() {
    this.http.get<Profile>(this.profileEndpoint).pipe(
      catchError(err => of(err))
    ).subscribe(response => {
        //console.log(response);
    });
  }
}
