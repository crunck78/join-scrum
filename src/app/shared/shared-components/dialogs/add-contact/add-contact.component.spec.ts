import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { ScrumContactsService } from "../../../../scrum-api/scrum-contacts/scrum-contacts.service";
import {
	clickElement,
	createCategoryResponse,
} from "../../../../testing/fixtures";
import { AddContactComponent } from "./add-contact.component";

const newContact = {
	name: "John Doe",
	email: "john.doe@example.com",
	phoneNumber: "123-456-7890",
};

describe("AddContactComponent", () => {
	let component: AddContactComponent;
	let fixture: ComponentFixture<AddContactComponent>;
	const addContact$ = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddContactComponent],
			providers: [
				{ provide: MatDialogRef, useValue: { close: vi.fn() } },
				{ provide: ScrumContactsService, useValue: { addContact$ } },
			],
		});
		fixture = TestBed.createComponent(AddContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should close dialog with new contact", () => {
		addContact$.mockReturnValue(of(createCategoryResponse(newContact)));
		component.addContactForm.setValue(newContact);

		fixture.detectChanges();

		component.addContact();

		expect(addContact$).toHaveBeenCalledWith(newContact);
	});

	it("should call addContact on button click", () => {
		const addCategorySpy = vi.spyOn(component, "addContact");
		component.addContactForm.setValue(newContact);
		fixture.detectChanges();
		clickElement(fixture, "button[aria-label='Create Contact']");
		expect(addCategorySpy).toHaveBeenCalledOnce();
	});
});
