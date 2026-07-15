import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { clickElement, createContactResponse } from "../../../testing/fixtures";
import { ContactDetailsComponent } from "./contact-details.component";

const mockContact = createContactResponse();

describe("ContactDetailsComponent", () => {
	let component: ContactDetailsComponent;
	let fixture: ComponentFixture<ContactDetailsComponent>;
	const dialogOpen = vi.fn();

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [ContactDetailsComponent],
			providers: [
				{
					provide: MatDialog,
					useValue: { open: dialogOpen },
				},
			],
		});
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
		dialogOpen.mockReturnValue({
			afterClosed: () => of(createContactResponse()),
			componentInstance: {
				contactToEdit: "",
				editContactForm: {
					patchValue: () => {},
				},
			},
		});
		fixture.detectChanges();

		const editSpy = vi.spyOn(component, "editContact");
		const addToTaskSpy = vi.spyOn(component, "addToTask");

		clickElement(fixture, "button[aria-label='Edit Contact']");
		clickElement(fixture, "button[aria-label='Add contact to Task']");

		expect(editSpy).toHaveBeenCalled();
		expect(addToTaskSpy).toHaveBeenCalled();
	});

	it("should emit contactChange on editContact", async () => {
		dialogOpen.mockReturnValue({
			afterClosed: () =>
				of(
					createContactResponse({
						email: "contactedited@test.local",
						name: "Edited Contact",
						phoneNumber: "01333333333",
					}),
				),
			componentInstance: {
				predefinedTaskRequest: null,
				contactToEdit: "",
				editContactForm: {
					patchValue: () => {},
				},
			},
		});
		vi.spyOn(component.contactChange, "emit");
		component.contact = mockContact;
		component.editContact();
		await fixture.whenStable();
		expect(component.contactChange.emit).toHaveBeenCalled();
	});

	it("should open add task dialog on addToTask", async () => {
		dialogOpen.mockReturnValue({
			componentInstance: {
				predefinedTaskRequest: null,
			},
		});
		component.contact = mockContact;
		component.addToTask();
		expect(dialogOpen).toHaveBeenCalled();
	});
});
