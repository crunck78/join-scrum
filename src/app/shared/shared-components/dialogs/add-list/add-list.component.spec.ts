import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { AddListComponent } from "./add-list.component";

describe("AddListComponent", () => {
	let component: AddListComponent;
	let fixture: ComponentFixture<AddListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddListComponent],
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});
		fixture = TestBed.createComponent(AddListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
