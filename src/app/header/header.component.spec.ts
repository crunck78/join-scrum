import { render } from "@testing-library/angular";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(HeaderComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
