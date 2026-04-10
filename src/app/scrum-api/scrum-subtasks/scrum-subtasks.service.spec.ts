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
import { Subtask, SubtaskResponseAPI } from "../../shared/models/subtask.model";
import {
	ScrumSubtasksService,
	SUBTASKS_ENDPOINT,
} from "./scrum-subtasks.service";

const mockSubtask: SubtaskResponseAPI = {
	created_at: "",
	done: false,
	id: 1,
	title: "Unit tests",
	updated_at: "",
};

const mockSubtaskRequest = {
	title: "Unit tests",
	done: false,
};

describe("ScrumSubtasksService", () => {
	let service: ScrumSubtasksService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumSubtasksService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getSubtasks$", () => {
		it("should return an array of subtasks on success", async () => {
			const resultPromise$ = firstValueFrom(service.getSubtasks$());
			const req = httpTesting.expectOne(
				SUBTASKS_ENDPOINT,
				"Request to load subtasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush([mockSubtask]);
			const result = await resultPromise$;
			expect(result).toEqual([Subtask.createInternalValue(mockSubtask)]);
		});

		it("should return an empty array on error", async () => {
			const resultPromise$ = firstValueFrom(service.getSubtasks$());
			const req = httpTesting.expectOne(
				SUBTASKS_ENDPOINT,
				"Request to load subtasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush("Error fetching subtasks", {
				status: 500,
				statusText: "Server Error",
			});

			expect(await resultPromise$).toEqual([]);
		});
	});

	describe("addSubtask$", () => {
		it("should return the created subtask on success", async () => {
			const resultPromise$ = firstValueFrom(
				service.addSubtask$(mockSubtaskRequest),
			);
			const req = httpTesting.expectOne(
				SUBTASKS_ENDPOINT,
				"Request to add a subtask",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Subtask.createRepresentation(mockSubtaskRequest),
			);
			req.flush(mockSubtask);
			const result = await resultPromise$;
			expect(result).toEqual(Subtask.createInternalValue(mockSubtask));
		});

		it("should return null on error", async () => {
			const resultPromise$ = firstValueFrom(
				service.addSubtask$(mockSubtaskRequest),
			);
			const req = httpTesting.expectOne(
				SUBTASKS_ENDPOINT,
				"Request to add a subtask",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Subtask.createRepresentation(mockSubtaskRequest),
			);
			req.flush("Error adding subtask", {
				status: 500,
				statusText: "Server Error",
			});

			expect(await resultPromise$).toBeNull();
		});
	});

	describe("updateSubtask$", () => {
		it("should return the updated subtask on success", async () => {
			const resultPromise$ = firstValueFrom(
				service.updateSubtask$(1, mockSubtaskRequest),
			);
			const req = httpTesting.expectOne(
				`${SUBTASKS_ENDPOINT}1/`,
				"Request to update a subtask",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(
				Subtask.createRepresentation(mockSubtaskRequest),
			);
			req.flush(mockSubtask);
			const result = await resultPromise$;
			expect(result).toEqual(Subtask.createInternalValue(mockSubtask));
		});

		it("should return null on error", async () => {
			const resultPromise$ = firstValueFrom(
				service.updateSubtask$(1, mockSubtaskRequest),
			);
			const req = httpTesting.expectOne(
				`${SUBTASKS_ENDPOINT}1/`,
				"Request to update a subtask",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(
				Subtask.createRepresentation(mockSubtaskRequest),
			);
			req.flush("Error updating subtask", {
				status: 500,
				statusText: "Server Error",
			});

			expect(await resultPromise$).toBeNull();
		});
	});
});
