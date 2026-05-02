import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ContactInitialsComponent } from "./contact-initials.component";

describe("ContactInitialsComponent", () => {
	let component: ContactInitialsComponent;
	let fixture: ComponentFixture<ContactInitialsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContactInitialsComponent] });
		fixture = TestBed.createComponent(ContactInitialsComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		fixture.detectChanges();
		expect(component).toBeDefined();
	});

	describe("Show contact image", () => {
		it("should show image", () => {
			component.imgSrc = "/assets/person.svg";
			fixture.detectChanges();
			const imageDebugEl = fixture.debugElement.query(By.css(".person-img"));
			expect(imageDebugEl).not.toBeNull();
			const imgElement = imageDebugEl.nativeElement as HTMLImageElement;
			expect(imgElement.getAttribute("src")).toBe(component.imgSrc);
			expect(imgElement.getAttribute("alt")).toBe("Person image");
		});

		it("should show image", () => {
			component.imgSrc = "/assets/person.svg";
			component.contactName = "John Doe";
			fixture.detectChanges();
			const imageDebugEl = fixture.debugElement.query(By.css(".person-img"));
			expect(imageDebugEl).not.toBeNull();
			const imgElement = imageDebugEl.nativeElement as HTMLImageElement;
			expect(imgElement.getAttribute("src")).toBe(component.imgSrc);
			expect(imgElement.getAttribute("alt")).toBe(
				`${component.contactName} image`,
			);
		});
	});

	describe("Show contact initials", () => {
		it("should show contact name initials", () => {
			component.contactName = "John Doe";
			fixture.detectChanges();
			const element = fixture.debugElement.nativeElement as HTMLElement;
			expect(element.innerText).toContain("JD");
		});

		it("should show contact email initials", () => {
			component.contactEmail = "johndoe@email.example";
			fixture.detectChanges();
			const element = fixture.debugElement.nativeElement as HTMLElement;
			expect(element.innerText).toContain("JE");
		});

		it("should show contact email initial", () => {
			component.contactEmail = "j@email.example";
			fixture.detectChanges();
			const element = fixture.debugElement.nativeElement as HTMLElement;
			expect(element.innerText).toContain("J");
		});

		it("should show contact # initial", () => {
			component.contactPhone = "015777777777";
			fixture.detectChanges();
			const element = fixture.debugElement.nativeElement as HTMLElement;
			expect(element.innerText).toContain("#");
		});
	});
});
