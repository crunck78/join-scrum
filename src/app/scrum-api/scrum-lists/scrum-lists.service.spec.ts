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
import { List, ListResponseAPI } from "../../shared/models/list.model";
import { TaskResponseAPI } from "../../shared/models/task.model";
import {
	createCategoryResponseAPI,
	createContactResponseAPI,
	createListResponseAPI,
	createSubtaskResponseAPI,
	createTaskResponseAPI,
} from "../../testing/fixtures";
import { LISTS_ENDPOINT, ScrumListsService } from "./scrum-lists.service";

const mockAssignee = createContactResponseAPI();
const mockCategory = createCategoryResponseAPI();
const mockSubtask = createSubtaskResponseAPI();
const mockTask: TaskResponseAPI = createTaskResponseAPI({
	assignees: [mockAssignee],
	category: mockCategory,
	subtasks: [mockSubtask],
});
const mockList: ListResponseAPI = createListResponseAPI({ tasks: [mockTask] });

describe("ScrumListsService", () => {
	let service: ScrumListsService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumListsService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("deleteList$", () => {
		it("should return true when delete list success", async () => {
			const resultPromise = firstValueFrom(service.deleteList$(1));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT + 1}/`,
				"Request to delete list",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush(true);

			expect(await resultPromise).toEqual(true);
		});

		it("should return false when delete list fails", async () => {
			const resultPromise = firstValueFrom(service.deleteList$(1));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT + 1}/`,
				"Request to delete list",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual(false);
		});
	});

	describe("getLists$", () => {
		it("should return mapped lists on success", async () => {
			const resultPromise = firstValueFrom(service.getLists$());
			const req = httpTesting.expectOne(
				LISTS_ENDPOINT,
				"Request to load lists",
			);
			expect(req.request.method).toBe("GET");

			req.flush([mockList]);

			expect(await resultPromise).toEqual([List.createInternalValue(mockList)]);
		});

		it("should return empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getLists$());
			const req = httpTesting.expectOne(
				LISTS_ENDPOINT,
				"Request to load lists",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("addList$", () => {
		it("should return mapped list on success", async () => {
			const resultPromise = firstValueFrom(service.addList$(mockList));
			const req = httpTesting.expectOne(LISTS_ENDPOINT, "Request to add list");
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(List.createRepresentation(mockList));

			req.flush(mockList);

			expect(await resultPromise).toEqual(List.createInternalValue(mockList));
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(service.addList$(mockList));
			const req = httpTesting.expectOne(LISTS_ENDPOINT, "Request to add list");

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("updateList$", () => {
		it("should return mapped list on success", async () => {
			const resultPromise = firstValueFrom(service.updateList$(1, mockList));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT + 1}/`,
				"Request to update list",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(List.createRepresentation(mockList));

			req.flush(mockList);

			expect(await resultPromise).toEqual(List.createInternalValue(mockList));
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(service.updateList$(1, mockList));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT + 1}/`,
				"Request to update list",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("getListById$", () => {
		it("should return mapped list on success", async () => {
			const listId = "1";
			const resultPromise = firstValueFrom(service.getListById$(listId));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT}${listId}/`,
				"Request to get list by id",
			);
			expect(req.request.method).toBe("GET");

			req.flush(mockList);

			expect(await resultPromise).toEqual(List.createInternalValue(mockList));
		});

		it("should return null on error", async () => {
			const listId = "1";
			const resultPromise = firstValueFrom(service.getListById$(listId));
			const req = httpTesting.expectOne(
				`${LISTS_ENDPOINT}${listId}/`,
				"Request to get list by id",
			);

			req.flush("Not found", { status: 404, statusText: "Not Found" });

			expect(await resultPromise).toBeNull();
		});
	});
});
