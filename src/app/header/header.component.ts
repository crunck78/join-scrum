import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderModule } from './header.module';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [HeaderModule]
})
export class HeaderComponent {

  constructor(private headerService: HeaderService) {

  }

  @Output() toggleDrawer = new EventEmitter();

  logout() {
    this.headerService.scrumApi.apiToken$.next({ token: "" });
  }

  get matchWebBreakpoint$ (){
    return this.headerService.breakPoints.matchesWebBreakpoint$;
  }

}
