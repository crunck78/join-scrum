import { Component, EventEmitter, Output } from '@angular/core';
import { ScrumApiService } from '../scrum-api/scrum-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleComponent } from '../shared/shared-components/page-title/page-title.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointsService } from '../shared/shared-services/breakpoints.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    PageTitleComponent
  ]
})
export class HeaderComponent {

  constructor(private scrumApi: ScrumApiService, private breakPoints: BreakpointsService) {

  }

  @Output() toggleDrawer = new EventEmitter();

  logout() {
    this.scrumApi.apiToken$.next({ token: "" });
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }

}
