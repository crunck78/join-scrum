import { render } from "@testing-library/angular";
import { NavigationComponent } from "./navigation.component";

describe("Navigation", () => {
	it("should create", async () => {
		const { fixture } = await render(NavigationComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
