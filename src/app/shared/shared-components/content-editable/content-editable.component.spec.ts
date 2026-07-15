import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Subject } from "rxjs";
import { ContentEditableComponent } from "./content-editable.component";

describe("ContentEditableComponent", () => {
	let component: ContentEditableComponent;
	let fixture: ComponentFixture<ContentEditableComponent>;
	const elementView = document.createElement("span");

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContentEditableComponent] });
		fixture = TestBed.createComponent(ContentEditableComponent);
		component = fixture.componentInstance;
		component.elementView = elementView;
	});

	it("should create", () => {
		fixture.detectChanges();
		expect(component).toBeDefined();
	});

	it("should call editValue when click on elementView", () => {
		const editValueSpy = vi.spyOn(component, "editValue");

		component.elementViewClick = true;
		fixture.detectChanges();
		elementView.click();

		expect(editValueSpy).toHaveBeenCalledOnce();
	});

	it("should call editValue when changing Subject emits", () => {
		const changingSubject = new Subject<void>();
		const editValueSpy = vi.spyOn(component, "editValue");

		component.changing = changingSubject;
		fixture.detectChanges();
		changingSubject.next();

		expect(editValueSpy).toHaveBeenCalledOnce();
	});

	it("should emit new value on updateValue", () => {
		const emitSpy = vi.spyOn(component.valueToEditChange, "emit");
		component.valueToEdit = "Value to Edit";
		fixture.detectChanges();

		component.updateValue();

		expect(emitSpy).toHaveBeenCalledWith("Value to Edit");
	});
});
