import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { EditContactComponent } from "./edit-contact.component";

describe("EditContactComponent", () => {
	let component: EditContactComponent;
	let fixture: ComponentFixture<EditContactComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [EditContactComponent],
			providers: [
				{
					provide: MatDialogRef,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(EditContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
