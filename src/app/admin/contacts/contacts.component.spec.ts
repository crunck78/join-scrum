import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { ContactResponse } from "../../shared/models/contact.model";
import { ContactDetailsComponent } from "../../shared/shared-components/contact-details/contact-details.component";
import {
	clickElement,
	createContactResponse,
	getComponentInstance,
	mockWithSideEffect,
} from "../../testing/fixtures";
import { ContactsComponent } from "./contacts.component";
import { ContactsService } from "./contacts.service";

describe("ContactsComponent", () => {
	let component: ContactsComponent;
	let fixture: ComponentFixture<ContactsComponent>;
	let contactsService: ContactsService;
	let getContactsServiceSpy$: Mock<() => Observable<ContactResponse[]>>;

	const contact = createContactResponse({
		email: "John",
		name: "Doe",
		phoneNumber: "015777777777",
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ContactsComponent],
			providers: [ContactsService],
		});
		contactsService = TestBed.inject(ContactsService);
		getContactsServiceSpy$ = vi.spyOn(contactsService, "contacts$", "get");

		fixture = TestBed.createComponent(ContactsComponent);

		component = fixture.componentInstance;
	});

	it("should create", () => {
		getContactsServiceSpy$.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		expect(component).toBeDefined();
	});

	it("should show contact", () => {
		getContactsServiceSpy$.mockReturnValue(of([contact]));
		fixture.autoDetectChanges();

		expect(component.contacts[0]).toEqual(contact);
	});

	it("should called addContact when action button is clicked", () => {
		getContactsServiceSpy$.mockReturnValue(of([]));

		const addContactSpy = vi.spyOn(component, "addContact");
		const afterAddContactServiceSpy = vi.spyOn(
			contactsService,
			"openAddContactDialog",
		);
		afterAddContactServiceSpy.mockReturnValue(
			mockWithSideEffect(contact, () => {
				getContactsServiceSpy$.mockReturnValue(of([contact]));
			}),
		);

		clickElement(fixture, 'button[aria-label="Add Contact"]');

		expect(afterAddContactServiceSpy).toHaveBeenCalledOnce();
		expect(addContactSpy).toHaveBeenCalledTimes(1);
		expect(component.contacts).toEqual([contact]);
	});

	it("should set selectedContact when app-contact is clicked", () => {
		getContactsServiceSpy$.mockReturnValue(of([contact]));
		fixture.autoDetectChanges();

		clickElement(fixture, "app-contact");

		expect(component.selectedContact).toEqual(contact);
	});

	it("should called closeSelectedContact when action button is clicked", () => {
		const closeSelectedContactSpy = vi.spyOn(component, "closeSelectedContact");
		getContactsServiceSpy$.mockReturnValue(of([contact]));
		component.selectedContact = contact;
		fixture.autoDetectChanges();

		clickElement(fixture, 'button[aria-label="Close selected contact"]');
		expect(closeSelectedContactSpy).toHaveBeenCalledTimes(1);
	});

	it("should called deleteContact when action button is clicked", () => {
		const deleteContactSpy = vi.spyOn(component, "deleteContact");
		getContactsServiceSpy$.mockReturnValue(of([contact]));
		component.selectedContact = contact;
		const deleteContactServiceSpy = vi.spyOn(contactsService, "deleteContact$");
		deleteContactServiceSpy.mockReturnValue(
			mockWithSideEffect(true, () => {
				getContactsServiceSpy$.mockReturnValue(of([]));
			}),
		);
		fixture.autoDetectChanges();

		clickElement(fixture, 'button[aria-label="Delete contact"]');
		expect(deleteContactSpy).toHaveBeenCalledExactlyOnceWith(contact.id);
		expect(component.contacts).toEqual([]);
	});

	it("should called refreshContacts when contactChanged emits", () => {
		getContactsServiceSpy$.mockReturnValue(of([contact]));
		component.selectedContact = contact;
		fixture.autoDetectChanges();

		const refreshContactsSpy = vi.spyOn(component, "refreshContacts");

		const childInstance = getComponentInstance(
			fixture,
			ContactDetailsComponent,
		);

		childInstance.contactChange.emit();

		expect(refreshContactsSpy).toHaveBeenCalledOnce();
	});
});
