import { Injectable } from '@angular/core';
import { ScrumSignupService } from 'src/app/scrum-api/scrum-signup/scrum-signup.service';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public scrumSignup: ScrumSignupService, public breakPoints: BreakpointsService) { }
}
