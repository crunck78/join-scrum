import { TestBed } from "@angular/core/testing";
import { firstValueFrom, ReplaySubject } from "rxjs";
import { AppService } from "./app.service";
import { ApiToken, ScrumApiService } from "./scrum-api/scrum-api.service";
import { BreakpointsService } from "./shared/shared-services/breakpoints/breakpoints.service";

describe("AppService", () => {
	let service: AppService;
	const matchesWebBreakpoint$ = new ReplaySubject<boolean>(1);
	const apiToken$ = new ReplaySubject<ApiToken>(1);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumApiService,
					useValue: { apiToken$ },
				},
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
			],
		});
		service = TestBed.inject(AppService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be created", async () => {
		expect(service).toBeTruthy();

		matchesWebBreakpoint$.next(true);
		let mode = await firstValueFrom(service.web$);
		expect(mode).toBe("side");

		matchesWebBreakpoint$.next(false);
		mode = await firstValueFrom(service.web$);
		expect(mode).toBe("over");

		apiToken$.next({ token: "some-token" });
		let loggedIn = await firstValueFrom(service.isLoggedIn$);
		expect(loggedIn).toBe(true);

		apiToken$.next({ token: "" });
		loggedIn = await firstValueFrom(service.isLoggedIn$);
		expect(loggedIn).toBe(false);
	});
});
