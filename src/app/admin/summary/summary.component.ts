import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrumSummaryService } from 'src/app/scrum-api/scrum-summary/scrum-summary.service';
import { SummaryResponse } from 'src/app/shared/models/summary.model';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { CategoryCardComponent } from 'src/app/shared/shared-components/category-card/category-card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent, PageTitleComponent, CategoryCardComponent]
})
export class SummaryComponent {
  summary !: SummaryResponse | null;
  constructor(private breakPoints: BreakpointsService, private scrumSummary: ScrumSummaryService) {
    this.scrumSummary.getSummary$().subscribe(
      {
        next: (summary) => this.summary = summary,
        error: (e) => console.log(e)
      }
    )
  }

  get matchWebBreakpoint$() {
    return this.breakPoints.matchesWebBreakpoint$;
  }
}
