import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface ApiToken {
  token: string;
}

export interface Model{
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ScrumApiService {

  token!: string;
  apiToken$!: BehaviorSubject<ApiToken>;

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
    this.apiToken$.subscribe(apiToken => {
      if (this.rememberMe)
        this.localToken = apiToken.token;
      this.token = apiToken?.token;
      if (apiToken && apiToken.token)
        this.router.navigate(['/'])
      else
        this.router.navigate(['/auth'])
      console.log("API_TOKEN: ", this.token);
    });
  }

  /**
   *
   */
  renameFields(object : any, oldNames : string[], newNames: string[]) {

    if (oldNames.length !== newNames.length) {
      throw new Error('Lists of old names and new names do not have same length');
    }
    let newObject = JSON.parse(JSON.stringify(object));; // Create a copy
    for (let i = 0; i < oldNames.length; i++) {
      if (newObject.hasOwnProperty(oldNames[i])) {
        newObject[newNames[i]] = newObject[oldNames[i]];
        delete newObject[oldNames[i]];
      }
    }
    return newObject;
  }
}
