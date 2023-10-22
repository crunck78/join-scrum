import { Injectable } from '@angular/core';
import { ScrumApiService } from '../scrum-api/scrum-api.service';
import { BreakpointsService } from '../shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(public scrumApi: ScrumApiService, public breakPoints: BreakpointsService) { }
}
