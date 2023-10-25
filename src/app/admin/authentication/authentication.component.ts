import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map } from 'rxjs';
import { LogoComponent } from 'src/app/shared/shared-components/logo/logo.component';
import { PageComponent } from 'src/app/shared/shared-components/page/page.component';
import { RouterLinkComponent } from 'src/app/shared/shared-components/router-link/router-link.component';
import { ToSignUpComponent } from 'src/app/shared/shared-components/to-sign-up/to-sign-up.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    PageComponent,
    RouterLinkComponent,
    CommonModule,
    ToSignUpComponent
  ]
})
export class AuthenticationComponent {
  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver) {
  }
  mobile$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches));
}
