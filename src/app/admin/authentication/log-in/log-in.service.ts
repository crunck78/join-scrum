import { Injectable } from '@angular/core';
import { ScrumApiService } from 'src/app/scrum-api/scrum-api.service';
import { ScrumLoginService } from 'src/app/scrum-api/scrum-login/scrum-login.service';
@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(public scrumLogin: ScrumLoginService,
    public scrumApi: ScrumApiService) { }
}
