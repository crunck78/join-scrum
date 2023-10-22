import { Injectable } from '@angular/core';
import { ScrumResetPasswordService } from 'src/app/scrum-api/scrum-reset-password/scrum-reset-password.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(public scrumResetPassword: ScrumResetPasswordService) { }
}
