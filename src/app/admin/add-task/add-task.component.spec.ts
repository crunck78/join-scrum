import { EventEmitter } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject, Subject } from "rxjs";
import { CategoryResponse } from "../../shared/models/category.model";
import { ContactResponse } from "../../shared/models/contact.model";
import { TaskResponse } from "../../shared/models/task.model";
import {
	createCategoryResponse,
	createContactResponse,
	createSubtaskRequest,
	createTaskRequest,
	createTaskResponse,
} from "../../testing/fixtures";
import { AddTaskComponent } from "./add-task.component";
import { AddTaskService } from "./add-task.service";

describe("AddTaskComponent", () => {
	let component: AddTaskComponent;
	let fixture: ComponentFixture<AddTaskComponent>;

	let categories$: BehaviorSubject<CategoryResponse[]>;
	let contacts$: BehaviorSubject<ContactResponse[]>;
	let addTask$: Subject<TaskResponse | null>;
	let editTask$: Subject<TaskResponse | null>;
	let deleteTask$: Subject<void>;
	let openAddCategoryDialog$: Subject<CategoryResponse | null>;
	let openAddContactDialog$: Subject<ContactResponse | null>;
	let mockService: {
		categories$: BehaviorSubject<CategoryResponse[]>;
		contacts$: BehaviorSubject<ContactResponse[]>;
		addTask$: ReturnType<typeof vi.fn>;
		editTask$: ReturnType<typeof vi.fn>;
		deleteTask$: ReturnType<typeof vi.fn>;
		openAddCategoryDialog$: ReturnType<typeof vi.fn>;
		openAddContactDialog$: ReturnType<typeof vi.fn>;
	};

	beforeEach(() => {
		categories$ = new BehaviorSubject<CategoryResponse[]>([]);
		contacts$ = new BehaviorSubject<ContactResponse[]>([]);
		addTask$ = new Subject<TaskResponse | null>();
		editTask$ = new Subject<TaskResponse | null>();
		deleteTask$ = new Subject<void>();
		openAddCategoryDialog$ = new Subject<CategoryResponse | null>();
		openAddContactDialog$ = new Subject<ContactResponse | null>();

		mockService = {
			categories$,
			contacts$,
			addTask$: vi.fn().mockReturnValue(addTask$),
			editTask$: vi.fn().mockReturnValue(editTask$),
			deleteTask$: vi.fn().mockReturnValue(deleteTask$),
			openAddCategoryDialog$: vi.fn().mockReturnValue(openAddCategoryDialog$),
			openAddContactDialog$: vi.fn().mockReturnValue(openAddContactDialog$),
		};

		TestBed.configureTestingModule({
			imports: [AddTaskComponent],
			providers: [{ provide: AddTaskService, useValue: mockService }],
		});

		fixture = TestBed.createComponent(AddTaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	describe("ngOnInit", () => {
		it("loads categories into component.categories", () => {
			const category = createCategoryResponse();
			categories$.next([category]);
			expect(component.categories).toEqual([category]);
		});

		it("loads contacts into component.contacts", () => {
			const contact = createContactResponse();
			contacts$.next([contact]);
			expect(component.contacts).toEqual([contact]);
		});

		it("emits formStatus$ when form status changes", () => {
			const emitted: string[] = [];
			component.formStatus$.subscribe((s) => emitted.push(s));
			component.addTaskForm.get("title")?.setValue("x");
			expect(emitted).toContain("INVALID");
		});
	});

	describe("ngOnChanges", () => {
		it("patches the form when task input changes", () => {
			const category = createCategoryResponse();
			const task = createTaskResponse({ category, title: "My Task" });
			component.task = task;
			component.ngOnChanges({
				task: {
					currentValue: task,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			expect(component.addTaskForm.get("title")?.value).toBe("My Task");
			expect(component.addTaskForm.get("category")?.value).toBe(category.id);
		});

		it("resets the form when clearTaskForm$ emits", () => {
			component.addTaskForm.get("title")?.setValue("Some Title");
			const emitter = new EventEmitter<void>();
			component.clearTaskForm$ = emitter;
			component.ngOnChanges({
				clearTaskForm$: {
					currentValue: emitter,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			emitter.emit();
			expect(component.addTaskForm.get("title")?.value).toBe("");
		});

		it("calls saveTask when submitTaskForm$ emits", () => {
			const spy = vi.spyOn(component, "saveTask");
			const emitter = new EventEmitter<void>();
			component.submitTaskForm$ = emitter;
			component.ngOnChanges({
				submitTaskForm$: {
					currentValue: emitter,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			emitter.emit();
			expect(spy).toHaveBeenCalledOnce();
		});

		it("calls deleteTask when deleteTask$ emits", () => {
			const spy = vi.spyOn(component, "deleteTask");
			const emitter = new EventEmitter<void>();
			component.deleteTask$ = emitter;
			component.ngOnChanges({
				deleteTask$: {
					currentValue: emitter,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			emitter.emit();
			expect(spy).toHaveBeenCalledOnce();
		});

		it("resets the form with predefinedTaskRequest values", () => {
			const request = createTaskRequest({ title: "Predefined Title" });
			component.predefinedTaskRequest = request;
			component.ngOnChanges({
				predefinedTaskRequest: {
					currentValue: request,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			expect(component.addTaskForm.get("title")?.value).toBe(
				"Predefined Title",
			);
		});

		it("falls back to InitTask defaults for missing predefinedTaskRequest fields", () => {
			component.predefinedTaskRequest = { title: "Partial" };
			component.ngOnChanges({
				predefinedTaskRequest: {
					currentValue: { title: "Partial" },
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});
			expect(component.addTaskForm.get("assignees")?.value).toEqual([]);
			expect(component.addTaskForm.get("description")?.value).toBe("");
		});
	});

	describe("addSubtask", () => {
		it("does nothing when addSubtaskForm is empty", () => {
			component.addSubtaskForm.setValue("");
			component.addSubtask();
			expect(component.addTaskForm.get("subtasks")?.value).toEqual([]);
		});

		it("pushes a new subtask onto the form", () => {
			component.addSubtaskForm.setValue("New Subtask");
			component.addSubtask();
			expect(component.addTaskForm.get("subtasks")?.value).toEqual([
				{ title: "New Subtask", done: false },
			]);
		});

		it("resets addSubtaskForm after adding", () => {
			component.addSubtaskForm.setValue("New Subtask");
			component.addSubtask();
			expect(component.addSubtaskForm.value).toBeNull();
		});
	});

	describe("removeSubtask", () => {
		it("removes the specified subtask from the form", () => {
			const subtaskToRemove = createSubtaskRequest({ title: "Remove Me" });
			const subtaskToKeep = createSubtaskRequest({ title: "Keep Me" });
			component.pushSubtask(subtaskToRemove);
			component.pushSubtask(subtaskToKeep);
			component.removeSubtask(subtaskToRemove);
			expect(component.addTaskForm.get("subtasks")?.value).toEqual([
				subtaskToKeep,
			]);
		});
	});

	describe("addCategory", () => {
		it("calls loadCategories when dialog returns a new category", () => {
			const spy = vi.spyOn(component, "loadCategories");
			component.addCategory();
			openAddCategoryDialog$.next(createCategoryResponse());
			expect(spy).toHaveBeenCalledOnce();
		});

		it("does not call loadCategories when dialog returns null", () => {
			const spy = vi.spyOn(component, "loadCategories");
			component.addCategory();
			openAddCategoryDialog$.next(null);
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe("addContact", () => {
		it("calls loadContacts when dialog returns a new contact", () => {
			const spy = vi.spyOn(component, "loadContacts");
			component.addContact();
			openAddContactDialog$.next(createContactResponse());
			expect(spy).toHaveBeenCalledOnce();
		});

		it("does not call loadContacts when dialog returns null", () => {
			const spy = vi.spyOn(component, "loadContacts");
			component.addContact();
			openAddContactDialog$.next(null);
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe("saveTask", () => {
		it("routes to addTask when mode is add", () => {
			fillValidForm();
			component.mode = "add";
			component.saveTask();
			expect(mockService.addTask$).toHaveBeenCalledOnce();
		});

		it("routes to editTask when mode is edit", () => {
			fillValidForm();
			component.mode = "edit";
			component.task = createTaskResponse();
			component.saveTask();
			expect(mockService.editTask$).toHaveBeenCalledOnce();
		});
	});

	describe("addTask", () => {
		it("does not call service when form is invalid", () => {
			component.addTask();
			expect(mockService.addTask$).not.toHaveBeenCalled();
		});

		it("emits addedTask$ with the response from the service", () => {
			fillValidForm();
			const emitted: (TaskResponse | null)[] = [];
			component.addedTask$.subscribe((t) => emitted.push(t));
			component.addTask();
			const newTask = createTaskResponse();
			addTask$.next(newTask);
			expect(emitted).toEqual([newTask]);
		});
	});

	describe("editTask", () => {
		it("does not call service when form is invalid", () => {
			component.editTask();
			expect(mockService.editTask$).not.toHaveBeenCalled();
		});

		it("emits editedTask$ with the response from the service", () => {
			fillValidForm();
			component.task = createTaskResponse();
			const emitted: (TaskResponse | null)[] = [];
			component.editedTask$.subscribe((t) => emitted.push(t));
			component.editTask();
			const updated = createTaskResponse({ title: "Updated" });
			editTask$.next(updated);
			expect(emitted).toEqual([updated]);
		});
	});

	describe("deleteTask", () => {
		it("does nothing when mode is add", () => {
			component.mode = "add";
			component.task = createTaskResponse();
			component.deleteTask();
			expect(mockService.deleteTask$).not.toHaveBeenCalled();
		});

		it("calls service and emits deletedTaskId$ when mode is edit", () => {
			const task = createTaskResponse({ id: 42 });
			component.mode = "edit";
			component.task = task;
			const emitted: (number | null)[] = [];
			component.deletedTaskId$.subscribe((id) => emitted.push(id));
			component.deleteTask();
			deleteTask$.next();
			expect(mockService.deleteTask$).toHaveBeenCalledWith(42);
			expect(emitted).toEqual([42]);
		});
	});

	describe("resetAddTask", () => {
		it("resets addTaskForm to InitTask values", () => {
			component.addTaskForm.get("title")?.setValue("some title");
			component.resetAddTask();
			expect(component.addTaskForm.get("title")?.value).toBe("");
		});

		it("resets addSubtaskForm", () => {
			component.addSubtaskForm.setValue("some subtask");
			component.resetAddTask();
			expect(component.addSubtaskForm.value).toBeNull();
		});
	});

	function fillValidForm() {
		component.addTaskForm.setValue({
			title: "Test Task",
			description: "",
			category: 1,
			assignees: [],
			dueDate: new Date(),
			priority: "Low",
			subtasks: [],
		});
	}
});
