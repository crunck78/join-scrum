import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { BreakpointsDirective } from "./breakpoints.directive";

describe("BreakpointsDirective", () => {
	let directive: BreakpointsDirective;
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [DomSanitizer] });
		directive = TestBed.runInInjectionContext(() => new BreakpointsDirective());
	});

	it("should create an instance", () => {
		expect(directive).toBeTruthy();
	});
});
