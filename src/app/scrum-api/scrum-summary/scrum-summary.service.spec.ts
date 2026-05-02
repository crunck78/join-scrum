import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import {
	Summary,
	SummaryResponseAPI,
	TaskCategoryCountResponseAPI,
	TaskListsCountResponseAPI,
	TaskPriorityCountResponseAPI,
	TasksInBacklogResponseAPI,
} from "../../shared/models/summary.model";
import { ScrumSummaryService, SUMMARY_ENDPOINT } from "./scrum-summary.service";

const mockTaskByPriorityResponse: TaskPriorityCountResponseAPI = {
	priority: "High",
	count: 10,
	latest_due_date: "2024-01-01T00:00:00Z",
};

const mockTaskListsCountResponse: TaskListsCountResponseAPI = {
	list__name: "To Do",
	count: 5,
	list__position: 1,
	list__board__title: "Sprint Board",
	latest_due_date: "2024-01-01T00:00:00Z",
};

const mockTasksInBacklogResponse: TasksInBacklogResponseAPI = {
	count: 5,
	latest_due_date: "2024-01-01T00:00:00Z",
};

const mockTaskByCategoryCountResponse: TaskCategoryCountResponseAPI = {
	category__name: "Bug",
	count: 3,
	latest_due_date: "2024-01-01T00:00:00Z",
	category__color: "#ff0000",
};

const mockSummaryResponse: SummaryResponseAPI = {
	tasks_by_category: [mockTaskByCategoryCountResponse],
	tasks_by_priority: [mockTaskByPriorityResponse],
	tasks_in_backlog: mockTasksInBacklogResponse,
	tasks_in_lists: [mockTaskListsCountResponse],
};

describe("ScrumSummaryService", () => {
	let service: ScrumSummaryService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumSummaryService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getSummary$", () => {
		it("should return a summary response on success", async () => {
			const resultPromise$ = firstValueFrom(service.getSummary$());

			const req = httpTesting.expectOne(
				SUMMARY_ENDPOINT,
				"Request to load summary",
			);
			expect(req.request.method).toBe("GET");
			req.flush(mockSummaryResponse);
			expect(await resultPromise$).toEqual(
				Summary.createInternalValue(mockSummaryResponse),
			);
			// We can also add more specific assertions here to check the transformation logic
		});

		it("should return null on error", async () => {
			const resultPromise$ = firstValueFrom(service.getSummary$());

			const req = httpTesting.expectOne(
				SUMMARY_ENDPOINT,
				"Request to load summary",
			);
			expect(req.request.method).toBe("GET");
			req.flush("Error fetching subtasks", {
				status: 500,
				statusText: "Server Error",
			});
			expect(await resultPromise$).toBeNull();
		});
	});
});
