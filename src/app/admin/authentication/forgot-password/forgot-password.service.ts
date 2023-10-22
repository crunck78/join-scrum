import { Injectable } from '@angular/core';
import { ScrumForgotPasswordService } from 'src/app/scrum-api/scrum-forgot-password/scrum-forgot-password.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(public scrumForgotPassword: ScrumForgotPasswordService) { }
}
