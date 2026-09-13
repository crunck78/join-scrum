import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { ScrumContactsService } from "../../../../scrum-api/scrum-contacts/scrum-contacts.service";
import { clickElement, createContactResponse } from "../../../../testing/fixtures";
import { ContactResponse } from "../../../models/contact.model";
import { EditContactComponent } from "./edit-contact.component";

describe("EditContactComponent", () => {
	let component: EditContactComponent;
	let fixture: ComponentFixture<EditContactComponent>;
	const mockDialogRef = {
		close: vi.fn(),
	};

	const contact$ = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [EditContactComponent],
			providers: [
				{
					provide: MatDialogRef,
					useValue: mockDialogRef,
				},
				{ provide: ScrumContactsService, useValue: { updateContact$: contact$ } },
			],
		});
		fixture = TestBed.createComponent(EditContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should edit contact when form is valid", () => {
		const contact = createContactResponse();
		component.editContactForm.patchValue(contact);
		component.contactToEdit = contact.id;
		contact$.mockReturnValue(new BehaviorSubject<ContactResponse | null>(contact));
		fixture.detectChanges();

		clickElement(fixture, 'button[aria-label="Save Contact"]');

		expect(mockDialogRef.close).toHaveBeenCalled();
	});
});
