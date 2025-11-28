import { render } from "@testing-library/angular";
import { SideComponent } from "./side.component";

describe("SideComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(SideComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
