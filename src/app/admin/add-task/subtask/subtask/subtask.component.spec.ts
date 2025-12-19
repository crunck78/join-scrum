import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { SubtaskComponent } from "./subtask.component";

describe("SubtaskComponent", () => {
	let component: SubtaskComponent;
	let fixture: ComponentFixture<SubtaskComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [SubtaskComponent] });
		fixture = TestBed.createComponent(SubtaskComponent);
		component = fixture.componentInstance;
		component.subtask = { title: "Test Subtask", done: false };
		component.subtaskId = 1;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should update subtask check", async () => {
		const updateSpy = vi.spyOn(component, "updateSubtaskCheck");
		const loader = TestbedHarnessEnvironment.loader(fixture);
		const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
		await checkboxHarness.check();
		fixture.detectChanges();

		expect(updateSpy).toHaveBeenCalledWith(true);
		expect(component.subtask.done).toBeTruthy();
	});

	it("should call editSubtask and emit changingSubtaskTitle$ on button click", () => {
		const changingSubtaskTitleSpy = vi.spyOn(
			component.changingSubtaskTitle$,
			"next",
		);
		const editSubtaskSpy = vi.spyOn(component, "editSubtask");
		const button = fixture.nativeElement.querySelector(
			'button[aria-label="Edit Subtask"]',
		);
		button.click();
		fixture.detectChanges();
		expect(editSubtaskSpy).toHaveBeenCalled();
		expect(changingSubtaskTitleSpy).toHaveBeenCalled();
	});

	it("should emit removeSubtask$ on remove button click", () => {
		const removeSubtaskSpy = vi.spyOn(component.removeSubtask$, "emit");
		const button = fixture.nativeElement.querySelector(
			'button[aria-label="Remove Subtask"]',
		);
		button.click();
		fixture.detectChanges();
		expect(removeSubtaskSpy).toHaveBeenCalledWith(component.subtask);
	});
});
