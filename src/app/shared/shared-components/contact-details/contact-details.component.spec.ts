import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactResponse } from "../../models/contact.model";
import { ContactDetailsComponent } from "./contact-details.component";

const mockContact: ContactResponse = {
	id: 1,
	name: "John Doe",
	email: "john.doe@example.com",
	phoneNumber: "123-456-7890",
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("ContactDetailsComponent", () => {
	let component: ContactDetailsComponent;
	let fixture: ComponentFixture<ContactDetailsComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({ imports: [ContactDetailsComponent] });
		fixture = TestBed.createComponent(ContactDetailsComponent);
		component = fixture.componentInstance;
		component.contact = mockContact;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should display contact information", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled?.textContent).toContain(mockContact.name);
		expect(compiled?.textContent).toContain(mockContact.email);
		expect(compiled?.textContent).toContain("JD");
	});

	it("should call addToTask and editContact on button clicks", async () => {
		fixture.detectChanges();
		const editButton = fixture.nativeElement.querySelector(
			"button[aria-label='Edit Contact']",
		) as HTMLButtonElement;
		const addToTaskButton = fixture.nativeElement.querySelector(
			"button[aria-label='Add contact to Task']",
		) as HTMLButtonElement;

		expect(editButton).toBeTruthy();
		expect(addToTaskButton).toBeTruthy();

		const editSpy = vi.spyOn(component, "editContact");
		const addToTaskSpy = vi.spyOn(component, "addToTask");

		editButton.click();
		addToTaskButton.click();

		expect(editSpy).toHaveBeenCalled();
		expect(addToTaskSpy).toHaveBeenCalled();
	});

	// it("should emit contactChange on editContact", async () => {
	// 	vi.spyOn(component.contactChange, "emit");
	// 	component.contact = mockContact;
	// 	component.editContact();
	// 	await fixture.whenStable();
	// 	expect(component.contactChange.emit).toHaveBeenCalled();
	// });

	// it("should open add task dialog on addToTask", async () => {
	// 	const dialogSpy = vi.spyOn(component["dialog"], "open");
	// 	component.contact = mockContact;
	// 	component.addToTask();
	// 	expect(dialogSpy).toHaveBeenCalled();
	// });
});
