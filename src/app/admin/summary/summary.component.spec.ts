import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { SummaryResponse } from "../../shared/models/summary.model";
import { UserResponse } from "../../shared/models/user.model";
import { createSummaryResponse, createUserResponse } from "../../testing/fixtures";
import { SummaryComponent } from "./summary.component";
import { SummaryService } from "./summary.service";

describe("SummaryComponent", () => {
	let component: SummaryComponent;
	let fixture: ComponentFixture<SummaryComponent>;
	let summaryService: SummaryService;
	let getSummaryServiceSpy$: Mock<() => Observable<SummaryResponse | null>>;
	let getProfileServiceSpy$: Mock<() => Observable<UserResponse | null>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SummaryComponent],
			providers: [SummaryService, { provide: ActivatedRoute, useValue: {} }],
		});
		summaryService = TestBed.inject(SummaryService);
		getSummaryServiceSpy$ = vi.spyOn(summaryService, "summary$", "get");
		getSummaryServiceSpy$.mockReturnValue(of(null));
		getProfileServiceSpy$ = vi.spyOn(summaryService, "profile$", "get");
		getProfileServiceSpy$.mockReturnValue(of(null));

		fixture = TestBed.createComponent(SummaryComponent);
		component = fixture.componentInstance;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create", () => {
		fixture.autoDetectChanges();
		expect(component).toBeDefined();
	});

	describe("summary", () => {
		it("should be null when summary$ returns null", () => {
			fixture.autoDetectChanges();
			expect(component.summary).toBeNull();
		});

		it("should be set when summary$ returns data", () => {
			const summary = createSummaryResponse({ tasksInBacklog: { count: 3, latestDueDate: new Date() } });
			getSummaryServiceSpy$.mockReturnValue(of(summary));
			fixture.autoDetectChanges();

			expect(component.summary).toEqual(summary);
		});
	});

	describe("profile", () => {
		it("should be null when profile$ returns null", () => {
			fixture.autoDetectChanges();

			expect(component.profile).toBeNull();
		});

		it("should be set when profile$ returns data", () => {
			const profile = createUserResponse();
			getProfileServiceSpy$.mockReturnValue(of(profile));
			fixture.autoDetectChanges();

			expect(component.profile).toEqual(profile);
		});
	});

	describe("summaryEmpty", () => {
		it("should return true when summary is null", () => {
			fixture.autoDetectChanges();

			expect(component.summaryEmpty).toBe(true);
		});

		it("should return true when all counts are zero", () => {
			getSummaryServiceSpy$.mockReturnValue(of(createSummaryResponse()));
			fixture.autoDetectChanges();

			expect(component.summaryEmpty).toBe(true);
		});

		it("should return false when summary has data", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({ tasksInBacklog: { count: 5, latestDueDate: new Date() } })),
			);
			fixture.autoDetectChanges();

			expect(component.summaryEmpty).toBe(false);
		});
	});

	describe("greetUser", () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		it("should return 'Good morning' before noon", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2024, 0, 1, 9));

			expect(component.greetUser).toBe("Good morning");
		});

		it("should return 'Good afternoon' between noon and 6pm", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2024, 0, 1, 14));

			expect(component.greetUser).toBe("Good afternoon");
		});

		it("should return 'Good evening' after 6pm", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2024, 0, 1, 20));

			expect(component.greetUser).toBe("Good evening");
		});
	});

	describe("tasks by priority", () => {
		it("should show 'Task' for a single task", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksByPriority: [{ priority: "Low", count: 1, latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-by-priority [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("Low");
			expect(subtitleEl.textContent).toContain("Task");
			expect(subtitleEl.textContent).not.toContain("Tasks");
		});

		it("should show 'Tasks' for multiple tasks", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksByPriority: [{ priority: "High", count: 3, latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-by-priority [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("High");
			expect(subtitleEl.textContent).toContain("Tasks");
		});
	});

	describe("tasks in lists", () => {
		it("should show list name and 'Task' for a single task", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksInLists: [{ listName: "TODO", count: 1, listPosition: 0, listBoardTitle: "Board", latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-in-lists [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("TODO");
			expect(subtitleEl.textContent).toContain("Task");
			expect(subtitleEl.textContent).not.toContain("Tasks");
		});

		it("should show 'Tasks' for multiple tasks", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksInLists: [{ listName: "In Progress", count: 5, listPosition: 1, listBoardTitle: "Board", latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-in-lists [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("Tasks");
		});
	});

	describe("greeting", () => {
		it("should show profile name when profile has a name", () => {
			getProfileServiceSpy$.mockReturnValue(of(createUserResponse({ name: "John Doe", email: "john@test.local" })));
			fixture.autoDetectChanges();

			const titleEl = fixture.nativeElement.querySelector(
				".greeting-wrapper [title]",
			);
			expect(titleEl.textContent).toContain("John Doe");
		});

		it("should show profile email when profile has no name", () => {
			getProfileServiceSpy$.mockReturnValue(of(createUserResponse({ name: "", email: "john@test.local" })));
			fixture.autoDetectChanges();

			const titleEl = fixture.nativeElement.querySelector(
				".greeting-wrapper [title]",
			);
			expect(titleEl.textContent).toContain("john@test.local");
		});

		it("should show 'Guest' when there is no profile", () => {
			fixture.autoDetectChanges();

			const titleEl = fixture.nativeElement.querySelector(
				".greeting-wrapper [title]",
			);
			expect(titleEl.textContent).toContain("Guest");
		});
	});

	describe("tasks by category", () => {
		it("should show 'Task' for a single task", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksByCategory: [{ categoryName: "IT", categoryColor: "#ff0000", count: 1, latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-by-category [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("Task");
			expect(subtitleEl.textContent).not.toContain("Tasks");
		});

		it("should show 'Tasks' for multiple tasks", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse({
					tasksByCategory: [{ categoryName: "IT", categoryColor: "#ff0000", count: 4, latestDueDate: new Date() }],
				})),
			);
			fixture.autoDetectChanges();

			const subtitleEl = fixture.nativeElement.querySelector(
				".tasks-by-category [subtitle]",
			);
			expect(subtitleEl.textContent).toContain("Tasks");
		});
	});
});
