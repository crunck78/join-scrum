import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map } from 'rxjs';
import { LogoComponent } from 'src/app/shared/shared-components/logo/logo.component';
import { PageComponent } from 'src/app/shared/shared-components/page/page.component';
import { RouterLinkComponent } from 'src/app/shared/shared-components/router-link/router-link.component';
import { ToSignUpComponent } from 'src/app/shared/shared-components/to-sign-up/to-sign-up.component';
import { AnnouncementComponent } from 'src/app/shared/shared-components/dialogs/announcement/announcement.component';
import { MatDialog } from '@angular/material/dialog';

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
    ToSignUpComponent,
    AnnouncementComponent
  ]
})
export class AuthenticationComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog) {
      this.dialog.open(AnnouncementComponent, {disableClose: true});
  }
  mobile$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches));
}
