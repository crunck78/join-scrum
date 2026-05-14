import { TestBed } from "@angular/core/testing";
import { firstValueFrom, ReplaySubject } from "rxjs";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";
import { HeaderService } from "./header.service";

describe("HeaderService", () => {
	let service: HeaderService;
	const logout = vi.fn();
	const matchesWebBreakpoint$ = new ReplaySubject<boolean>(1);

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

	it("should be created", async () => {
		expect(service).toBeTruthy();
		service.logout();
		expect(logout).toHaveBeenCalledTimes(1);

		matchesWebBreakpoint$.next(true);
		expect(await firstValueFrom(service.matchWebBreakpoint$)).toBe(true);

		matchesWebBreakpoint$.next(false);
		expect(await firstValueFrom(service.matchWebBreakpoint$)).toBe(false);
	});
});
