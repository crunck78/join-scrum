import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subscription, map } from 'rxjs';
import { AppModule } from './app.module';
import { ScrumApiService, ApiToken } from './scrum-api/scrum-api.service';
import { BreakpointsService } from './shared/shared-services/breakpoints/breakpoints.service';
import { openCloseAnimationHeader } from './app.animations';


export declare type ViewState = 'open' | 'closed';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AppModule],
  animations: [openCloseAnimationHeader]
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'join';
  web$ = this.breakpoints.matchesWebBreakpoint$.pipe(
    map(matches => matches ? 'side' : 'over' as MatDrawerMode)
  );
  toggleViewHeader: ViewState = 'open';
  onNextTokenSub$!: Subscription;

  get isLoggedIn$() {
    return this.scrumApi.apiToken$.pipe(map((apiToken: ApiToken) => !!apiToken.token));
  }

  get arrowTransformation() {
    return this.toggleViewHeader == 'closed' ? 'translate(45, 50) rotate(180, 6.99996, 8)' : 'translate(45, 45) ';
  }

  constructor(
    private scrumApi: ScrumApiService,
    private breakpoints: BreakpointsService
  ) { }

  ngOnInit(): void {
    this.onNextTokenSub$ = this.scrumApi.apiToken$
      .subscribe(apiToken => this.scrumApi.onNextToken(apiToken));
  }

  ngOnDestroy(): void {
    this.onNextTokenSub$.unsubscribe();
  }

  toggleHeader(event: Event) {
    event.preventDefault();
    if (this.toggleViewHeader == 'open') {
      this.toggleViewHeader = 'closed';
      return;
    }

    if (this.toggleViewHeader == 'closed') {
      this.toggleViewHeader = 'open';
      return;
    }
  }
}
