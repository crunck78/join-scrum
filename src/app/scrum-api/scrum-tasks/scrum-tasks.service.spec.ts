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
import { CategoryResponseAPI } from "../../shared/models/category.model";
import { ContactResponseAPI } from "../../shared/models/contact.model";
import {
	SubtaskRequest,
	SubtaskResponseAPI,
} from "../../shared/models/subtask.model";
import {
	Task,
	TaskRequest,
	TaskResponseAPI,
} from "../../shared/models/task.model";
import { ScrumTasksService, TASKS_ENDPOINT } from "./scrum-tasks.service";

const mockAssignee: ContactResponseAPI = {
	created_at: "",
	email: "test.user@example.local",
	id: 1,
	name: "John Doe",
	phone_number: "01555555555",
	updated_at: "",
};

const mockCategory: CategoryResponseAPI = {
	color: "#ffffff",
	created_at: "",
	id: 1,
	name: "IT",
	update_at: "",
};

const mockSubtask: SubtaskResponseAPI = {
	created_at: "",
	done: false,
	id: 1,
	title: "Unit tests",
	updated_at: "",
};

const mockTask: TaskResponseAPI = {
	assignees: [mockAssignee],
	category: mockCategory,
	created_at: "",
	description: "Some Bug to fix",
	due_date: "",
	id: 1,
	position: 1,
	priority: "Low",
	subtasks: [mockSubtask],
	title: "Fix the bug",
	updated_at: "",
};

const newSubTaskRequest: SubtaskRequest = {
	title: "Subtask 1",
	done: false,
};

const newTaskRequest: TaskRequest = {
	title: "New Task",
	description: "Description of the new task",
	category: 1,
	assignees: [1],
	dueDate: new Date("2024-12-31"),
	priority: "Medium" as const,
	subtasks: [newSubTaskRequest],
	list: null,
	position: 1,
};

describe("ScrumTasksService", () => {
	let service: ScrumTasksService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumTasksService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getTasks$", async () => {
		it("should return an array of tasks", async () => {
			const resultPromise = firstValueFrom(service.getTasks$());
			const req = httpTesting.expectOne(
				TASKS_ENDPOINT,
				"Request to load tasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush([mockTask]);

			expect(await resultPromise).toEqual([Task.createInternalValue(mockTask)]);
		});

		it("should return an empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getTasks$());
			const req = httpTesting.expectOne(
				TASKS_ENDPOINT,
				"Request to load tasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("getBacklog$", async () => {
		it("should return an array of tasks", async () => {
			const resultPromise = firstValueFrom(service.getBacklog$());
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}?list_is_null=true`,
				"Request to load backlog tasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush([mockTask]);

			expect(await resultPromise).toEqual([Task.createInternalValue(mockTask)]);
		});

		it("should return an empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getBacklog$());
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}?list_is_null=true`,
				"Request to load backlog tasks",
			);
			expect(req.request.method).toBe("GET");
			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("addTask$", async () => {
		it("should return the created task on success", async () => {
			const resultPromise = firstValueFrom(service.addTask$(newTaskRequest));
			const req = httpTesting.expectOne(
				TASKS_ENDPOINT,
				"Request to add a new task",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Task.createRepresentation(newTaskRequest),
			);

			req.flush(mockTask);

			expect(await resultPromise).toEqual(Task.createInternalValue(mockTask));
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(service.addTask$(newTaskRequest));
			const req = httpTesting.expectOne(
				TASKS_ENDPOINT,
				"Request to add a new task",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Task.createRepresentation(newTaskRequest),
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("deleteTask$", async () => {
		it("should return the deleted task id on success", async () => {
			const taskIdToDelete = 1;
			const resultPromise = firstValueFrom(service.deleteTask$(taskIdToDelete));
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}${taskIdToDelete}/`,
				"Request to delete a task",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush({ id: taskIdToDelete });

			expect(await resultPromise).toBe(true);
		});

		it("should return null on error", async () => {
			const taskIdToDelete = 1;
			const resultPromise = firstValueFrom(service.deleteTask$(taskIdToDelete));
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}${taskIdToDelete}/`,
				"Request to delete a task",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBe(false);
		});
	});

	describe("updateTask$", async () => {
		it("should return the updated task on success", async () => {
			const taskIdToUpdate = 1;
			const updateData = {
				title: "Updated Task Title",
			};
			const resultPromise = firstValueFrom(
				service.updateTask$(taskIdToUpdate, updateData),
			);
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}${taskIdToUpdate}/`,
				"Request to update a task",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(updateData);

			const updatedTask = { ...mockTask, ...updateData };
			req.flush(updatedTask);

			expect(await resultPromise).toEqual(
				Task.createInternalValue(updatedTask),
			);
		});

		it("should return null on error", async () => {
			const taskIdToUpdate = 1;
			const updateData = {
				title: "Updated Task Title",
			};
			const resultPromise = firstValueFrom(
				service.updateTask$(taskIdToUpdate, updateData),
			);
			const req = httpTesting.expectOne(
				`${TASKS_ENDPOINT}${taskIdToUpdate}/`,
				"Request to update a task",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(updateData);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});
});
