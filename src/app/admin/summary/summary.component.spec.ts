import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { SummaryResponse } from "../../shared/models/summary.model";
import { UserResponse } from "../../shared/models/user.model";
import {
	createSummaryResponse,
	createUserResponse,
} from "../../testing/fixtures";
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
		it.each([
			{ value: null },
			{
				value: createSummaryResponse({
					tasksInBacklog: { count: 3, latestDueDate: new Date() },
				}),
			},
		])("should reflect summary$ emission", ({ value }) => {
			getSummaryServiceSpy$.mockReturnValue(of(value));
			fixture.autoDetectChanges();
			expect(component.summary).toEqual(value);
		});
	});

	describe("profile", () => {
		it.each([
			{ value: null },
			{ value: createUserResponse() },
		])("should reflect profile$ emission", ({ value }) => {
			getProfileServiceSpy$.mockReturnValue(of(value));
			fixture.autoDetectChanges();
			expect(component.profile).toEqual(value);
		});
	});

	describe("summaryEmpty", () => {
		it.each([
			{ summary: null, expected: true },
			{ summary: createSummaryResponse(), expected: true },
			{
				summary: createSummaryResponse({
					tasksInBacklog: { count: 5, latestDueDate: new Date() },
				}),
				expected: false,
			},
		])("should be $expected", ({ summary, expected }) => {
			getSummaryServiceSpy$.mockReturnValue(of(summary));
			fixture.autoDetectChanges();
			expect(component.summaryEmpty).toBe(expected);
		});
	});

	describe("greetUser", () => {
		afterEach(() => vi.useRealTimers());

		it.each([
			{ hour: 9, expected: "Good morning" },
			{ hour: 14, expected: "Good afternoon" },
			{ hour: 20, expected: "Good evening" },
		])("should return '$expected' at hour $hour", ({ hour, expected }) => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2024, 0, 1, hour));
			expect(component.greetUser).toBe(expected);
		});
	});

	describe("greeting", () => {
		it.each([
			{
				profile: createUserResponse({
					name: "John Doe",
					email: "john@test.local",
				}),
				expected: "John Doe",
			},
			{
				profile: createUserResponse({ name: "", email: "john@test.local" }),
				expected: "john@test.local",
			},
			{
				profile: createUserResponse({ name: "", email: "" }),
				expected: "Guest",
			},
			{ profile: null, expected: "Guest" },
		])("should show '$expected' in title", ({ profile, expected }) => {
			getProfileServiceSpy$.mockReturnValue(of(profile));
			fixture.autoDetectChanges();
			const titleEl = fixture.nativeElement.querySelector(
				".greeting-wrapper [title]",
			);
			expect(titleEl.textContent).toContain(expected);
		});
	});

	describe.each([
		{
			label: "tasks by priority",
			selector: ".tasks-by-priority",
			single: {
				tasksByPriority: [
					{ priority: "Low", count: 1, latestDueDate: new Date() },
				],
			},
			multiple: {
				tasksByPriority: [
					{ priority: "High", count: 3, latestDueDate: new Date() },
				],
			},
		},
		{
			label: "tasks in lists",
			selector: ".tasks-in-lists",
			single: {
				tasksInLists: [
					{
						listName: "TODO",
						count: 1,
						listPosition: 0,
						listBoardTitle: "Board",
						latestDueDate: new Date(),
					},
				],
			},
			multiple: {
				tasksInLists: [
					{
						listName: "In Progress",
						count: 5,
						listPosition: 1,
						listBoardTitle: "Board",
						latestDueDate: new Date(),
					},
				],
			},
		},
		{
			label: "tasks by category",
			selector: ".tasks-by-category",
			single: {
				tasksByCategory: [
					{
						categoryName: "IT",
						categoryColor: "#ff0000",
						count: 1,
						latestDueDate: new Date(),
					},
				],
			},
			multiple: {
				tasksByCategory: [
					{
						categoryName: "IT",
						categoryColor: "#ff0000",
						count: 4,
						latestDueDate: new Date(),
					},
				],
			},
		},
	])("$label", ({ selector, single, multiple }) => {
		it("should show 'Task' for a single task", () => {
			getSummaryServiceSpy$.mockReturnValue(of(createSummaryResponse(single)));
			fixture.autoDetectChanges();
			const el = fixture.nativeElement.querySelector(`${selector} [subtitle]`);
			expect(el.textContent).toContain("Task");
			expect(el.textContent).not.toContain("Tasks");
		});

		it("should show 'Tasks' for multiple tasks", () => {
			getSummaryServiceSpy$.mockReturnValue(
				of(createSummaryResponse(multiple)),
			);
			fixture.autoDetectChanges();
			const el = fixture.nativeElement.querySelector(`${selector} [subtitle]`);
			expect(el.textContent).toContain("Tasks");
		});
	});
});
