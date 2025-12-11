import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddTaskComponent } from "./add-task.component";

describe("AddTaskComponent", () => {
	let component: AddTaskComponent;
	let fixture: ComponentFixture<AddTaskComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [AddTaskComponent] });
		fixture = TestBed.createComponent(AddTaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	// it("should emit form status changes when task input changes", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;
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

	// it("should reset form when clearTaskForm$ emits after being set", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;
	// 	const resetSpy = vi.spyOn(component, "resetAddTask");
	// 	const clearTaskEmitter = new EventEmitter<void>();

	// 	component.clearTaskForm$ = clearTaskEmitter;
	// 	component.ngOnChanges({
	// 		clearTaskForm$: new SimpleChange(undefined, clearTaskEmitter, true),
	// 	});

	// 	clearTaskEmitter.emit();
	// 	expect(resetSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should reset forms to initial state when resetAddTask is called", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;

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

	// it("should save form when submitTaskForm$ emits after being set", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;
	// 	const saveSpy = vi.spyOn(component, "saveTask");
	// 	const submitTaskForm = new EventEmitter<void>();

	// 	component.submitTaskForm$ = submitTaskForm;
	// 	component.ngOnChanges({
	// 		submitTaskForm$: new SimpleChange(undefined, submitTaskForm, true),
	// 	});

	// 	submitTaskForm.emit();
	// 	expect(saveSpy).toHaveBeenCalledTimes(1);
	// });

	// it("should call addTask when saveTask is called", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;
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
	// 	// expect(component.addSubtaskForm.getRawValue()).toEqual(task.subtasks);
	// 	expect(addSpy).toHaveBeenCalledTimes(1);
	// 	expect(editSpy).toHaveBeenCalledTimes(0);
	// });

	// it("should call editTask when saveTask is called", async () => {
	// 	const { fixture } = await render(AddTaskComponent, {});
	// 	const component = fixture.componentInstance;
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
	// 			updateAt: new Date(),
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
	// 	component.addTaskForm.patchValue(taskRepresentation);

	// 	component.mode = "edit";
	// 	component.saveTask();

	// 	expect(component.addTaskForm.getRawValue()).toEqual(taskRepresentation);
	// 	// expect(component.addSubtaskForm.getRawValue()).toEqual(task.subtasks);
	// 	expect(addSpy).toHaveBeenCalledTimes(0);
	// 	expect(editSpy).toHaveBeenCalledTimes(1);
	// });
});
