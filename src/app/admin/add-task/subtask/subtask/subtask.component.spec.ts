import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { ContentEditableComponent } from "../../../../shared/shared-components/content-editable/content-editable.component";
import {
	clickElement,
	createSubtaskRequest,
	getComponentInstance,
	getElement,
} from "../../../../testing/fixtures";
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
		expect(getElement(fixture, "app-content-editable")).toBeTruthy();

		clickElement(fixture, 'button[aria-label="Edit Subtask"]');

		const contentEditable = getComponentInstance(
			fixture,
			ContentEditableComponent,
		);
		contentEditable.valueToEdit = "Changed Subtask title";
		contentEditable.updateValue();

		expect(component.subtask.title).toEqual("Changed Subtask title");

		const loader = TestbedHarnessEnvironment.loader(fixture);
		const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
		await checkboxHarness.check();
		fixture.detectChanges();

		expect(component.subtask.done).toBeTruthy();

		const removeSubtaskSpy = vi.spyOn(component.removeSubtask$, "emit");
		clickElement(fixture, 'button[aria-label="Remove Subtask"]');
		fixture.detectChanges();
		expect(removeSubtaskSpy).toHaveBeenCalledWith(component.subtask);
	});
});
