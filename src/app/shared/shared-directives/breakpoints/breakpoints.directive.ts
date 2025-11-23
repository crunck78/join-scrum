import { Directive, inject } from "@angular/core";
import { BreakpointsService } from "./../../shared-services/breakpoints/breakpoints.service";

@Directive({
	selector: "[appBreakpoints]",
	standalone: true,
})
export class BreakpointsDirective {
	private breakpoints = inject(BreakpointsService);

	get matchWebBreakpoint$() {
		return this.breakpoints.matchesWebBreakpoint$;
	}
}
