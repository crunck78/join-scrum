import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrumSummaryService } from 'src/app/scrum-api/scrum-summary/scrum-summary.service';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent,PageTitleComponent]
})
export class SummaryComponent {
  constructor(private breakPoints: BreakpointsService, private scrumSummary: ScrumSummaryService){
    this.scrumSummary.getSummary$().subscribe(
      {
        next: (summary) => console.log(summary),
        error: (e) => console.error(e)
      }
    )
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }
}
