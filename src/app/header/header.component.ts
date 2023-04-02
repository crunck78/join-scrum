import { Component, EventEmitter, Output } from '@angular/core';
import { ScrumApiService } from '../scrum-api/scrum-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class HeaderComponent {

  constructor(private scrumApi: ScrumApiService) {

  }

  @Output() toggleDrawer = new EventEmitter();

  logout() {
    this.scrumApi.apiToken$.next({ token: "" });
  }

}
