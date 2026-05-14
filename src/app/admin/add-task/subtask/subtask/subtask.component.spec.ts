import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { By } from "@angular/platform-browser";
import { ContentEditableComponent } from "../../../../shared/shared-components/content-editable/content-editable.component";
import { createSubtaskRequest } from "../../../../testing/fixtures";
import { SubtaskComponent } from "./subtask.component";

describe("SubtaskComponent", () => {
	let component: SubtaskComponent;
	let fixture: ComponentFixture<SubtaskComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [SubtaskComponent] });
		fixture = TestBed.createComponent(SubtaskComponent);
		component = fixture.componentInstance;
	});

	it("should create", async () => {
		expect(component).toBeDefined();

		component.subtask = createSubtaskRequest();
		fixture.detectChanges();
		expect(
			fixture.nativeElement.querySelector("app-content-editable"),
		).toBeTruthy();

		const contentEditable = fixture.debugElement.query(
			By.directive(ContentEditableComponent),
		).componentInstance as ContentEditableComponent;

		const editButton = fixture.nativeElement.querySelector(
			'button[aria-label="Edit Subtask"]',
		);
		editButton.click();

		contentEditable.valueToEdit = "Changed Subtask title";
		contentEditable.updateValue();

		expect(component.subtask.title).toEqual("Changed Subtask title");

		const loader = TestbedHarnessEnvironment.loader(fixture);
		const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
		await checkboxHarness.check();
		fixture.detectChanges();

		expect(component.subtask.done).toBeTruthy();

		const removeSubtaskSpy = vi.spyOn(component.removeSubtask$, "emit");
		const deleteButton = fixture.nativeElement.querySelector(
			'button[aria-label="Remove Subtask"]',
		);
		deleteButton.click();
		fixture.detectChanges();
		expect(removeSubtaskSpy).toHaveBeenCalledWith(component.subtask);
	});
});
