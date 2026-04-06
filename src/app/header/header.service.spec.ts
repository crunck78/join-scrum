import { TestBed } from "@angular/core/testing";
import { Subject } from "rxjs";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";
import { HeaderService } from "./header.service";

describe("HeaderService", () => {
	let service: HeaderService;
	const logout = vi.fn();
	const matchesWebBreakpoint$ = new Subject<boolean>();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumApiService,
					useValue: { logout },
				},
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
			],
		});
		service = TestBed.inject(HeaderService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should delegate logout to ScrumApiService", () => {
		service.logout();
		expect(logout).toHaveBeenCalledTimes(1);
	});

	it("should return the breakpoints observable", () => {
		expect(service.matchWebBreakpoint$).toBe(matchesWebBreakpoint$);
	});
});
