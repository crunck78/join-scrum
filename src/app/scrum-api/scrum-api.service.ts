import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface ApiToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumApiService {

  token!: string;
  apiToken$!: BehaviorSubject<ApiToken>;

  isLoggedIn(): boolean {
    const token = this.apiToken$.getValue();
    return token && token.token !== '';
  }

  get headersTokenAuthorization() {
    return new HttpHeaders({
      'Authorization': `Token ${this.token}`
    });
  }

  set rememberMe(value: boolean) {
    try {
      localStorage.setItem('rememberMe', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  get rememberMe() {
    try {
      return JSON.parse(localStorage.getItem('rememberMe') || 'false') || false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  set localToken(token: string) {
    try {
      localStorage.setItem('join-token', token);
    } catch (error) {
      console.log(error);
    }
  }

  get localToken() {
    try {
      return localStorage.getItem('join-token') as string;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  constructor(private router: Router) {
    const init = this.rememberMe ? this.localToken : '';
    this.apiToken$ = new BehaviorSubject<ApiToken>({ token: init });
  }

  onNextToken(apiToken: ApiToken) {
    if (this.rememberMe)
      this.localToken = apiToken.token;
    this.token = apiToken?.token;
  }

  logout(){
    this.router.navigate(['/auth/log-in'])
    this.apiToken$.next({ token: "" });
  }
}
