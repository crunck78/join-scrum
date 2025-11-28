import { render } from "@testing-library/angular";
import { CategoryCardComponent } from "./category-card.component";

describe("CategoryCardComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(CategoryCardComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
