import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { ApiToken, ScrumApiService } from './scrum-api/scrum-api.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    SideComponent,
    HeaderComponent,
    MainComponent
  ],
})
export class AppComponent {
  constructor(private scrumApi: ScrumApiService) { }
  title = 'join';

  get isLoggedIn$() {
    return this.scrumApi.apiToken$.pipe(map((apiToken: ApiToken) => !!apiToken.token));
  }
}
