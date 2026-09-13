import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskMode } from "../../../../admin/add-task/add-task.module";
import { clickElement, createTaskResponse, getElement } from "../../../../testing/fixtures";
import { AddTaskDialogComponent } from "./add-task-dialog.component";

describe("AddTaskDialogComponent", () => {
	let component: AddTaskDialogComponent;
	let fixture: ComponentFixture<AddTaskDialogComponent>;
	const mockDialogRef = { close: vi.fn() };

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddTaskDialogComponent],
			providers: [
				{ provide: MatDialogRef, useValue: mockDialogRef },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			],
		});
		fixture = TestBed.createComponent(AddTaskDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	describe("title mode", () => {
		it.each(["add", "edit"])("should have title mode %s", (mode) => {
			component.mode = mode as TaskMode;
			fixture.detectChanges();
			if (mode === "add") {
				expect(component.title).toBe("Add Task");
			} else if (mode === "edit") {
				expect(component.title).toBe("Edit Task");
			}
		});
	});

	it("should emit clearTaskForm$ when clear button is clicked", () => {
		vi.spyOn(component.clearTaskForm$, "emit");
		clickElement(fixture, 'button[aria-label="Clear Task Form"]');
		expect(component.clearTaskForm$.emit).toHaveBeenCalled();
	});

	it("should emit submitTaskForm$ when submit button is clicked", () => {
		vi.spyOn(component.submitTaskForm$, "emit");
		clickElement(fixture, 'button[aria-label="Submit Task Form"]');
		expect(component.submitTaskForm$.emit).toHaveBeenCalled();
	});

	it("should emit deleteTask$ when delete button is clicked", () => {
		component.mode = "edit";
		fixture.detectChanges();
		vi.spyOn(component.deleteTask$, "emit");
		clickElement(fixture, 'button[aria-label="Delete Task"]');
		expect(component.deleteTask$.emit).toHaveBeenCalled();
	});

	it("should not show delete button when mode is add", () => {
		component.mode = "add";
		fixture.detectChanges();
		expect(getElement(fixture, 'button[aria-label="Delete Task"]')).toBeNull();
	});

	it("should close the dialog with the correct event when handleActionTaskForm is called", () => {
		vi.spyOn(mockDialogRef, "close");
		const mockTaskResponse = createTaskResponse();
		component.handleActionTaskForm(mockTaskResponse);
		expect(mockDialogRef.close).toHaveBeenCalledWith(mockTaskResponse);
	});

});
