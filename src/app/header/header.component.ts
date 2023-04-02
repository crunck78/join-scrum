import { Component, EventEmitter, Output } from '@angular/core';
import { ScrumApiService } from '../scrum-api/scrum-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent {

  constructor(private scrumApi: ScrumApiService){

  }

  @Output() toggleDrawer = new EventEmitter();

  logout(){
    this.scrumApi.apiToken$.next({token: ""});
  }

}
