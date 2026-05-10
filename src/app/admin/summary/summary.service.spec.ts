import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { ScrumSummaryService } from "../../scrum-api/scrum-summary/scrum-summary.service";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { createSummaryResponse, createUserResponse } from "../../testing/fixtures";
import { SummaryService } from "./summary.service";

describe("SummaryService", () => {
	let service: SummaryService;
	const getSummary$ = vi.fn();
	const getProfile$ = vi.fn();
	const matchesWebBreakpoint$ = new Subject<boolean>();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumSummaryService,
					useValue: { getSummary$ },
				},
				{
					provide: ScrumProfileService,
					useValue: { getProfile$ },
				},
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
			],
		});
		service = TestBed.inject(SummaryService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("summary$", () => {
		it("should return null when there is no summary", async () => {
			getSummary$.mockReturnValue(of(null));

			const result = await firstValueFrom(service.summary$);

			expect(result).toBeNull();
		});

		it("should return summary", async () => {
			const summary = createSummaryResponse({ tasksInBacklog: { count: 3, latestDueDate: new Date() } });
			getSummary$.mockReturnValue(of(summary));

			const result = await firstValueFrom(service.summary$);

			expect(result).toEqual(summary);
		});
	});

	describe("profile$", () => {
		it("should return null when there is no profile", async () => {
			getProfile$.mockReturnValue(of(null));

			const result = await firstValueFrom(service.profile$);

			expect(result).toBeNull();
		});

		it("should return profile", async () => {
			const profile = createUserResponse();
			getProfile$.mockReturnValue(of(profile));

			const result = await firstValueFrom(service.profile$);

			expect(result).toEqual(profile);
		});
	});

	describe("matchWebBreakpoint$", () => {
		it("should return the breakpoints observable", () => {
			expect(service.matchWebBreakpoint$).toBe(matchesWebBreakpoint$);
		});
	});
});
