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
  apiToken$ = new BehaviorSubject<ApiToken>({ token: '' })

  constructor(private router: Router) {
    this.apiToken$.subscribe(apiToken => {
      this.token = apiToken?.token;
      if (apiToken && apiToken.token)
        this.router.navigate(['/'])
      else
        this.router.navigate(['/auth'])
      console.log("API_TOKEN: ", this.token);
    });
  }
}
