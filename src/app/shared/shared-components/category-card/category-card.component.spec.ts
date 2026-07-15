import { ComponentFixture, TestBed } from "@angular/core/testing";
import { createCategoryResponse, getElement } from "../../../testing/fixtures";
import { CategoryCardComponent } from "./category-card.component";

const mockCategory = createCategoryResponse();

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
		const categoryElement = getElement(fixture, ".task-category");
		expect(categoryElement?.textContent).toContain("IT");
		expect(categoryElement?.getAttribute("style")).toContain(
			"background-color: rgb(255, 0, 0);",
		);
	});
});
