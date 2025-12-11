import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContentEditableComponent } from "./content-editable.component";

describe("ContentEditableComponent", () => {
	let component: ContentEditableComponent;
	let fixture: ComponentFixture<ContentEditableComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ContentEditableComponent] });
		fixture = TestBed.createComponent(ContentEditableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
