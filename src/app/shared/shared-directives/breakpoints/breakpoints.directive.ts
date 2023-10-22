import { Directive } from '@angular/core';
import { BreakpointsService } from './../../shared-services/breakpoints/breakpoints.service';

@Directive({
  selector: '[appBreakpoints]',
  standalone: true
})
export class BreakpointsDirective {

  constructor(private breakpoints: BreakpointsService) { }

  get matchWebBreakpoint$ (){
    return this.breakpoints.matchesWebBreakpoint$;
  }

}
