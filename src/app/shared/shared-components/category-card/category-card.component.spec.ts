import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryResponse } from "../../models/category.model";
import { CategoryCardComponent } from "./category-card.component";

const mockCategory: CategoryResponse = {
	id: 1,
	name: "Development",
	color: "#ff0000",
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("CategoryCardComponent", () => {
	let component: CategoryCardComponent;
	let fixture: ComponentFixture<CategoryCardComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [CategoryCardComponent] });
		fixture = TestBed.createComponent(CategoryCardComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should display category name and color when category is provided", async () => {
		component.category = mockCategory;
		await fixture.whenStable();
		const compiled = fixture.nativeElement as HTMLElement;
		const categoryElement = compiled.querySelector(".task-category");
		expect(categoryElement).toBeTruthy();
		expect(categoryElement?.textContent).toContain("Development");
		expect(categoryElement?.getAttribute("style")).toContain(
			"background-color: rgb(255, 0, 0);",
		);
	});
});
