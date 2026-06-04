import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { ScrumSummaryService } from "../../scrum-api/scrum-summary/scrum-summary.service";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import {
	createSummaryResponse,
	createUserResponse,
} from "../../testing/fixtures";
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
		const summary = createSummaryResponse();

		it.each([
			{
				description: "should return null when there is no summary",
				serviceResult: null,
				expected: null,
			},
			{
				description: "should return summary",
				serviceResult: summary,
				expected: summary,
			},
		])("$description", async ({ serviceResult, expected }) => {
			getSummary$.mockReturnValue(of(serviceResult));

			const result = await firstValueFrom(service.summary$);

			expect(result).toEqual(expected);
		});
	});

	describe("profile$", () => {
		const profile = createUserResponse();

		it.each([
			{
				description: "should return null when there is no profile",
				serviceResult: null,
				expected: null,
			},
			{
				description: "should return profile",
				serviceResult: profile,
				expected: profile,
			},
		])("$description", async ({ serviceResult, expected }) => {
			getProfile$.mockReturnValue(of(serviceResult));

			const result = await firstValueFrom(service.profile$);

			expect(result).toEqual(expected);
		});
	});
});
