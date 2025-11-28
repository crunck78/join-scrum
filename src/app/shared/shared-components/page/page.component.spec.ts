import { render } from "@testing-library/angular";
import { PageComponent } from "./page.component";

describe("PageComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(PageComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
