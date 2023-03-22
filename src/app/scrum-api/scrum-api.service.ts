import { Injectable } from '@angular/core';
import { LoginCredentials, ScrumLoginService } from './scrum-login.service';

@Injectable({
  providedIn: 'root'
})
export class ScrumApiService {

  constructor(private scrumLogin: ScrumLoginService) { }

  login(loginCredentials: LoginCredentials){
      this.scrumLogin.loginCredentials = loginCredentials;
      this.scrumLogin.login();
  }
}
