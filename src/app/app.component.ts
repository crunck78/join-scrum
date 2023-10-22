import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

import { map } from 'rxjs';
import { AppModule } from './app.module';
import { ScrumApiService, ApiToken } from './scrum-api/scrum-api.service';
import { BreakpointsService } from './shared/shared-services/breakpoints/breakpoints.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AppModule],
})
export class AppComponent {
  constructor(private scrumApi: ScrumApiService, private breakpoints: BreakpointsService) {
    this.scrumApi.handleTokenChanges();
  }
  title = 'join';

  web$ = this.breakpoints.matchesWebBreakpoint$.pipe(
    map(matches => matches ? 'side' : 'over' as MatDrawerMode)
  );

  get isLoggedIn$() {
    return this.scrumApi.apiToken$.pipe(map((apiToken: ApiToken) => !!apiToken.token));
  }
}
