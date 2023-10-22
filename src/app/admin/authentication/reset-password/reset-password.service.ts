import { Injectable } from '@angular/core';
import { ScrumResetPasswordService } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(public scrumResetPassword: ScrumResetPasswordService,
    public breakPoints: BreakpointsService) { }
}
