import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { ScrumCategoriesService } from "../../../../scrum-api/scrum-categories/scrum-categories.service";
import {
	clickElement,
	createCategoryResponse,
} from "../../../../testing/fixtures";
import { AddCategoryComponent } from "./add-category.component";

const newCategory = {
	name: "IT",
	color: "#fff000",
};

describe("AddCategoryComponent", () => {
	let component: AddCategoryComponent;
	let fixture: ComponentFixture<AddCategoryComponent>;
	const addCategory$ = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddCategoryComponent],
			providers: [
				{ provide: MatDialogRef, useValue: { close: vi.fn() } },
				{ provide: ScrumCategoriesService, useValue: { addCategory$ } },
			],
		});
		fixture = TestBed.createComponent(AddCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should close dialog with new category", () => {
		addCategory$.mockReturnValue(of(createCategoryResponse(newCategory)));
		component.addCategoryForm.setValue(newCategory);

		fixture.detectChanges();

		component.addCategory();

		expect(addCategory$).toHaveBeenCalledWith(newCategory);
	});

	it("should call addCategory on button click", () => {
		const addCategorySpy = vi.spyOn(component, "addCategory");
		component.addCategoryForm.setValue(newCategory);
		fixture.detectChanges();
		clickElement(fixture, "button[aria-label='Create Category']");
		expect(addCategorySpy).toHaveBeenCalledOnce();
	});
});
