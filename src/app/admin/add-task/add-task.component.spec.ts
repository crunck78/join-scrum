import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddTaskComponent } from "./add-task.component";

describe("AddTaskComponent", () => {
	let component: AddTaskComponent;
	let fixture: ComponentFixture<AddTaskComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddTaskComponent],
		});
		fixture = TestBed.createComponent(AddTaskComponent);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	// it("should emit form status changes when task input changes", async () => {
	// 	const emitSpy = vi.spyOn(component.formStatus$, "emit");

	// 	const task = {
	// 		id: 1,
	// 		title: "Existing task",
	// 		description: "Description",
	// 		category: {
	// 			id: 1,
	// 			name: "Category",
	// 			color: "#ff0000",
	// 		} as CategoryResponse,
	// 		assignees: [
	// 			{
	// 				id: 1,
	// 				name: "John Doe",
	// 				email: "john@example.com",
	// 				phoneNumber: "+4915777777777",
	// 				createdAt: new Date(),
	// 				updatedAt: new Date(),
	// 			} as ContactResponse,
	// 		],
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 		subtasks: [
	// 			{
	// 				id: 1,
	// 				title: "Subtask",
	// 				done: false,
	// 			} as SubtaskResponse,
	// 		],
	// 		createdAt: new Date(),
	// 		updatedAt: new Date(),
	// 		position: 0,
	// 	} as TaskResponse;

	// 	component.task = task;
	// 	component.ngOnChanges({
	// 		task: new SimpleChange(undefined, task, true),
	// 	});
	// 	await fixture.whenStable();

	// 	expect(emitSpy).toHaveBeenCalled();
	// 	const lastStatus = emitSpy.mock.calls[emitSpy.mock.calls.length - 1][0];
	// 	expect(lastStatus).toBe("VALID");
	// });

	// it("should reset form when clearTaskForm$ emits after being set", () => {
	// 	const resetSpy = vi.spyOn(component, "resetAddTask");
	// 	const clearTaskEmitter = new EventEmitter<void>();

	// 	component.clearTaskForm$ = clearTaskEmitter;
	// 	component.ngOnChanges({
	// 		clearTaskForm$: new SimpleChange(undefined, clearTaskEmitter, true),
	// 	});

	// 	clearTaskEmitter.emit();
	// 	expect(resetSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should delete task when deleteTask$ emits after being set", () => {
	// 	const deleteSpy = vi.spyOn(component, "deleteTask");
	// 	const deleteTaskEmitter = new EventEmitter<void>();

	// 	component.deleteTask$ = deleteTaskEmitter;
	// 	component.ngOnChanges({
	// 		deleteTask$: new SimpleChange(undefined, deleteTaskEmitter, true),
	// 	});

	// 	deleteTaskEmitter.emit();
	// 	expect(deleteSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should reset from to predefinedTaskRequest when predefinedTaskRequest input changes ", async () => {
	// 	const predefinedTaskRequest = {
	// 		title: "Predefined Task",
	// 		description: "Description",
	// 		category: 1,
	// 		assignees: [1, 2],
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 		subtasks: [{ title: "Subtask 1", done: false }],
	// 	} as Partial<TaskRequest>;

	// 	component.predefinedTaskRequest = predefinedTaskRequest;
	// 	component.ngOnChanges({
	// 		predefinedTaskRequest: new SimpleChange(
	// 			undefined,
	// 			predefinedTaskRequest,
	// 			true,
	// 		),
	// 	});
	// 	await fixture.whenStable();

	// 	const formValue = component.addTaskForm.getRawValue();
	// 	expect(formValue).toEqual(predefinedTaskRequest);
	// });

	// it("should reset from to initialTask when predefinedTaskRequest input changes and empty", async () => {
	// 	const predefinedTaskRequest = {} as Partial<TaskRequest>;

	// 	component.predefinedTaskRequest = predefinedTaskRequest;
	// 	component.ngOnChanges({
	// 		predefinedTaskRequest: new SimpleChange(
	// 			undefined,
	// 			predefinedTaskRequest,
	// 			true,
	// 		),
	// 	});
	// 	await fixture.whenStable();

	// 	const expectedTaskFormValue = component.InitTask;

	// 	const formValue = component.addTaskForm.getRawValue();
	// 	expect(formValue).toEqual(expectedTaskFormValue);
	// });

	// it("should called addCategory when action button is clicked", () => {
	// 	const addCategorySpy = vi.spyOn(component, "addCategory");
	// 	const addCategoryButton: HTMLButtonElement =
	// 		fixture.nativeElement.querySelector('button[aria-label="Add Category"]');
	// 	addCategoryButton.click();
	// 	expect(addCategorySpy).toHaveBeenCalledTimes(1);
	// });

	// it("should called addContact when action button is clicked", () => {
	// 	const addContactSpy = vi.spyOn(component, "addContact");
	// 	const addContactButton: HTMLButtonElement =
	// 		fixture.nativeElement.querySelector('button[aria-label="Add Contact"]');
	// 	addContactButton.click();
	// 	expect(addContactSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should called addSubtask when action button is clicked", async () => {
	// 	const addSubtaskSpy = vi.spyOn(component, "addSubtask");

	// 	component.addSubtaskForm.patchValue("New Subtask");
	// 	await fixture.whenStable();
	// 	const addSubtaskButton: HTMLButtonElement =
	// 		fixture.nativeElement.querySelector('button[aria-label="Add Subtask"]');
	// 	addSubtaskButton.click();
	// 	expect(addSubtaskSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should called removeSubtask when button is clicked", async () => {
	// 	const removeSubtaskSpy = vi.spyOn(component, "removeSubtask");

	// 	component.addTaskForm.patchValue({
	// 		subtasks: [
	// 			{
	// 				title: "Existing Subtask",
	// 				done: false,
	// 			} as SubtaskRequest,
	// 		],
	// 	});
	// 	await fixture.whenStable();
	// 	fixture.detectChanges();
	// 	const removeSubtaskButton: HTMLButtonElement =
	// 		fixture.nativeElement.querySelector(
	// 			'button[aria-label="Remove Subtask"]',
	// 		);
	// 	removeSubtaskButton.click();
	// 	expect(removeSubtaskSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should reset forms to initial state when resetAddTask is called", () => {
	// 	const task = {
	// 		title: "Some Task",
	// 		description: "Some Description",
	// 		category: 1,
	// 		assignees: <number[]>[1, 2],
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 		subtasks: <SubtaskRequest[]>[{ title: "Subtask 1", done: true }],
	// 	} as TaskFormGroup;

	// 	component.addTaskForm.patchValue(task);
	// 	component.resetAddTask();

	// 	expect(component.addTaskForm.getRawValue()).toEqual(component.InitTask);
	// 	expect(component.addSubtaskForm.value).toBeNull();
	// });

	// it("should save form when submitTaskForm$ emits after being set", () => {
	// 	const saveSpy = vi.spyOn(component, "saveTask");
	// 	const submitTaskForm = new EventEmitter<void>();

	// 	component.submitTaskForm$ = submitTaskForm;
	// 	component.ngOnChanges({
	// 		submitTaskForm$: new SimpleChange(undefined, submitTaskForm, true),
	// 	});

	// 	submitTaskForm.emit();
	// 	expect(saveSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should call addTask on add mode when saveTask is called", () => {
	// 	const addSpy = vi.spyOn(component, "addTask");
	// 	const editSpy = vi.spyOn(component, "editTask");

	// 	const task = {
	// 		title: "Some Task",
	// 		description: "Some Description",
	// 		category: 1,
	// 		assignees: <number[]>[1, 2],
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 		subtasks: <SubtaskRequest[]>[{ title: "Subtask 1", done: true }],
	// 	} as TaskFormGroup;

	// 	component.addTaskForm.patchValue(task);

	// 	component.mode = "add";
	// 	component.saveTask();

	// 	expect(component.addTaskForm.getRawValue()).toEqual(task);
	// 	// is this broken? the subtasks are part of the main form, not the addSubtaskForm
	// 	// expect(component.addSubtaskForm.getRawValue()).toEqual(task.subtasks);
	// 	expect(addSpy).toHaveBeenCalledTimes(1);
	// 	expect(editSpy).toHaveBeenCalledTimes(0);
	// });

	// it("should call editTask on edit mode when saveTask is called", () => {
	// 	const addSpy = vi.spyOn(component, "addTask");
	// 	const editSpy = vi.spyOn(component, "editTask");

	// 	const task = {
	// 		id: 1,
	// 		createdAt: new Date(),
	// 		updatedAt: new Date(),
	// 		title: "Some Task",
	// 		description: "Some Description",
	// 		category: {
	// 			name: "Bug",
	// 			color: "#ff0000",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 			id: 1,
	// 		} as CategoryResponse,
	// 		assignees: <ContactResponse[]>[
	// 			{
	// 				email: "john@example.com",
	// 				name: "John",
	// 				phoneNumber: "+4915777777777",
	// 				createdAt: new Date(),
	// 				updatedAt: new Date(),
	// 				id: 1,
	// 			},
	// 		],
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 		subtasks: <SubtaskRequest[]>[{ title: "Subtask 1", done: true }],
	// 		position: 0,
	// 	} as TaskResponse;

	// 	component.task = task;
	// 	const taskRepresentation = Task.convertToRepresentation(task);
	// 	delete taskRepresentation.position; // position is not part of the form
	// 	component.addTaskForm.patchValue(taskRepresentation);

	// 	component.mode = "edit";
	// 	component.saveTask();

	// 	const addTaskFormValue = component.addTaskForm.getRawValue();
	// 	// const addSubtaskFormValue = component.addSubtaskForm.getRawValue();

	// 	expect(addTaskFormValue).toEqual(taskRepresentation);
	// 	// is this broken? the subtasks are part of the main form, not the addSubtaskForm
	// 	// expect(addSubtaskFormValue).toEqual(task.subtasks);
	// 	expect(addSpy).toHaveBeenCalledTimes(0);
	// 	expect(editSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should call resetTask on button click", () => {
	// 	const resetSpy = vi.spyOn(component, "resetAddTask");
	// 	const button: HTMLButtonElement = fixture.nativeElement.querySelector(
	// 		'button[aria-label="Clear Task Form"]',
	// 	);
	// 	button.click();
	// 	expect(resetSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should call saveTask on button click", () => {
	// 	const saveSpy = vi.spyOn(component, "saveTask");
	// 	component.hideFooter = false;
	// 	component.addTaskForm.patchValue({
	// 		title: "Some Task",
	// 		category: 1,
	// 		dueDate: new Date(),
	// 		priority: "Low",
	// 	});
	// 	fixture.detectChanges();
	// 	const button: HTMLButtonElement = fixture.nativeElement.querySelector(
	// 		'button[aria-label="Save Task"]',
	// 	);
	// 	button.click();
	// 	expect(saveSpy).toHaveBeenCalledTimes(1);
	// });
});
