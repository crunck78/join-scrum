import { ComponentFixture, TestBed } from "@angular/core/testing";
import { createContactResponse, getElement } from "../../../testing/fixtures";
import { ContactResponse } from "../../models/contact.model";
import { ContactComponent } from "./contact.component";

const mockContact = createContactResponse();

describe("ContactComponent", () => {
	let component: ContactComponent;
	let fixture: ComponentFixture<ContactComponent>;

	function setup(contact: ContactResponse, selected: boolean) {
		component.contact = contact;
		component.selected = selected;
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContactComponent] });
		fixture = TestBed.createComponent(ContactComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		fixture.detectChanges();
		expect(component).toBeDefined();
	});

	it("should display contact information when contact is provided", () => {
		setup(mockContact, true);

		const contactCard = getElement(fixture, "app-contact-card");
		expect(contactCard).toBeTruthy();
		expect(contactCard?.textContent).toContain("John Doe");
		expect(contactCard?.textContent).toContain("john.doe@example.com");
	});

	it("should display phoneNumber when email and name are not provided", () => {
		setup(
			{
				...mockContact,
				email: "",
				name: "",
			},
			true,
		);

		const contactCard = getElement(fixture, "app-contact-card");
		expect(contactCard).toBeTruthy();
		expect(contactCard?.textContent).toContain("123-456-7890");
	});

	it("should display mat-raised-button when selected is true", async () => {
		setup(mockContact, true);
		expect(getElement(fixture, "button[mat-raised-button]")).toBeTruthy();
	});

	it("should display mat-stroked-button when selected is false", async () => {
		setup(mockContact, false);
		expect(getElement(fixture, "button[mat-stroked-button]")).toBeTruthy();
	});
});
