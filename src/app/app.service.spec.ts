import { TestBed } from "@angular/core/testing";
import { Subject } from "rxjs";
import { AppService } from "./app.service";
import { ScrumApiService } from "./scrum-api/scrum-api.service";
import { BreakpointsService } from "./shared/shared-services/breakpoints/breakpoints.service";

describe("AppService", () => {
	let service: AppService;
	const matchesWebBreakpoint$ = new Subject<boolean>();
	const isLoggedIn = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumApiService,
					useValue: { isLoggedIn },
				},
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
			],
		});
		service = TestBed.inject(AppService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
