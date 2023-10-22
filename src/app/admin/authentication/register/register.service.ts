import { Injectable } from '@angular/core';
import { ScrumSignupService } from 'src/app/scrum-api/scrum-signup/scrum-signup.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public scrumSignup: ScrumSignupService) { }
}
