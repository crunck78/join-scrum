import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { AddContactComponent } from "./add-contact.component";

describe("AddContactComponent", () => {
	let component: AddContactComponent;
	let fixture: ComponentFixture<AddContactComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddContactComponent],
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});
		fixture = TestBed.createComponent(AddContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
