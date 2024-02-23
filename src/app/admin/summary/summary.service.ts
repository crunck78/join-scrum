import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ScrumProfileService } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { ScrumSummaryService } from 'src/app/scrum-api/scrum-summary/scrum-summary.service';
import { SummaryResponse } from 'src/app/shared/models/summary.model';
import { UserResponse } from 'src/app/shared/models/user.model';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'any'
})
export class SummaryService {

  summary!: SummaryResponse | null;
  profile!: UserResponse | null;

  constructor(public breakPoints: BreakpointsService,
    private scrumSummary: ScrumSummaryService,
    private scrumProfile: ScrumProfileService
  ) {
    this.scrumSummary.getSummary$().pipe(take(1))
      .subscribe((summary) => this.summary = summary);
    this.scrumProfile.getProfile$().pipe(take(1))
      .subscribe((profile) => this.profile = profile);
  }
}
