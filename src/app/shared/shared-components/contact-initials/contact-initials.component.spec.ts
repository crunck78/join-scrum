import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactInitialsComponent } from "./contact-initials.component";

describe("ContactInitialsComponent", () => {
	let component: ContactInitialsComponent;
	let fixture: ComponentFixture<ContactInitialsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContactInitialsComponent] });
		fixture = TestBed.createComponent(ContactInitialsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
