import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getElement } from "../../../testing/fixtures";
import { ContactResponse } from "../../models/contact.model";
import { ContactComponent } from "./contact.component";

const mockContact: ContactResponse = {
	id: 1,
	name: "John Doe",
	email: "john.doe@example.com",
	phoneNumber: "123-456-7890",
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("ContactComponent", () => {
	let component: ContactComponent;
	let fixture: ComponentFixture<ContactComponent>;

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
		component.contact = mockContact;
		component.selected = true;
		fixture.detectChanges();

		const contactCard = getElement(fixture, "app-contact-card");
		expect(contactCard).toBeTruthy();
		expect(contactCard?.textContent).toContain("John Doe");
		expect(contactCard?.textContent).toContain("john.doe@example.com");
	});

	it("should display phoneNumber when email and name are not provided", () => {
		component.contact = {
			...mockContact,
			email: "",
			name: "",
		};
		component.selected = true;
		fixture.detectChanges();

		const contactCard = getElement(fixture, "app-contact-card");
		expect(contactCard).toBeTruthy();
		expect(contactCard?.textContent).toContain("123-456-7890");
	});

	it("should display mat-raised-button when selected is true", async () => {
		component.contact = mockContact;
		component.selected = true;

		fixture.detectChanges();

		expect(getElement(fixture, "button[mat-raised-button]")).toBeTruthy();
	});

	it("should display mat-stroked-button when selected is false", async () => {
		component.contact = mockContact;
		component.selected = false;

		fixture.detectChanges();

		expect(getElement(fixture, "button[mat-stroked-button]")).toBeTruthy();
	});
});
