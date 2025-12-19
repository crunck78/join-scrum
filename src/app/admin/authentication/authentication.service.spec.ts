import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
	let service: AuthenticationService;
	let breakpointsService: BreakpointsService;
	let mobileSpy: Mock<() => Observable<boolean>>;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [BreakpointsService] });
		breakpointsService = TestBed.inject(BreakpointsService);
		mobileSpy = vi.spyOn(breakpointsService, "mobile$", "get");
		service = TestBed.inject(AuthenticationService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should get mobile$ true from BreakpointsService", () => {
		mobileSpy.mockReturnValue(of(true));

		service.mobile$.subscribe((isMobile) => {
			expect(isMobile).toBe(true);
		});
	});

	it("should get mobile$ false from BreakpointsService", () => {
		mobileSpy.mockReturnValue(of(false));

		service.mobile$.subscribe((isMobile) => {
			expect(isMobile).toBe(false);
		});
	});
});
