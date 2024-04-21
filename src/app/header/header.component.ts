import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderModule } from './header.module';
import { HeaderService } from './header.service';
import { ViewState } from '../app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [HeaderModule]
})
export class HeaderComponent {
  constructor(private headerService: HeaderService) { }

  @Input() toggleHeaderView!: ViewState;
  @Output() toggleDrawer = new EventEmitter();

  logout() {
    this.headerService.logout();
  }

  get matchWebBreakpoint$() {
    return this.headerService.breakPoints.matchesWebBreakpoint$;
  }

}
