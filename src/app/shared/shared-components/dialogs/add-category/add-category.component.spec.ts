import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { AddCategoryComponent } from "./add-category.component";

describe("AddCategoryComponent", () => {
	let component: AddCategoryComponent;
	let fixture: ComponentFixture<AddCategoryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddCategoryComponent],
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});
		fixture = TestBed.createComponent(AddCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
