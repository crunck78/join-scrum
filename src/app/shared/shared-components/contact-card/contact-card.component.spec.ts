import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactResponse } from "../../models/contact.model";
import { ContactCardComponent } from "./contact-card.component";

const mockContact: ContactResponse = {
	id: 1,
	name: "John Doe",
	email: "john.doe@example.com",
	phoneNumber: "123-456-7890",
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("ContactCardComponent", () => {
	let component: ContactCardComponent;
	let fixture: ComponentFixture<ContactCardComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContactCardComponent] });
		fixture = TestBed.createComponent(ContactCardComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should display contact information", async () => {
		component.contact = mockContact;
		await fixture.whenStable();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled?.textContent).toContain(mockContact.name);
		expect(compiled?.textContent).toContain(mockContact.email);
		expect(compiled?.textContent).toContain("JD");
	});
});
