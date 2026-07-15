import { ComponentFixture, TestBed } from "@angular/core/testing";
import { createContactResponse } from "../../../testing/fixtures";
import { ContactCardComponent } from "./contact-card.component";

const mockContact = createContactResponse();

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
