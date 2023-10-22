import { Injectable } from '@angular/core';
import { ScrumForgotPasswordService } from 'src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(public scrumForgotPassword: ScrumForgotPasswordService, public breakPoints: BreakpointsService) { }
}
