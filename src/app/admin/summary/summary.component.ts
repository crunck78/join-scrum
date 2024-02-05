import { Component } from '@angular/core';
import { ScrumProfileService } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { ScrumSummaryService } from 'src/app/scrum-api/scrum-summary/scrum-summary.service';
import { SummaryResponse } from 'src/app/shared/models/summary.model';
import { UserResponse } from 'src/app/shared/models/user.model';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';
import { SummaryModule } from './summary.module';
import { SummaryService } from './summary.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [SummaryModule],
  providers: [SummaryService]
})
export class SummaryComponent {

  constructor(private summaryService: SummaryService) { }

  get summary(): SummaryResponse | null {
    return this.summaryService.summary;
  }

  get profile(): UserResponse | null {
    return this.summaryService.profile;
  }

  get matchWebBreakpoint$() {
    return this.summaryService.breakPoints.matchesWebBreakpoint$;
  }

  get greetUser(): string {
    const hours = new Date().getHours();
    let greeting = 'Hello';
    if (hours < 12) {
      greeting = 'Good morning';
    } else if (hours < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return greeting;
  }
}
