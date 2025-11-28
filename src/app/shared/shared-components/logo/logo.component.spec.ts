import { render } from "@testing-library/angular";
import { LogoComponent } from "./logo.component";

describe("LogoComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(LogoComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
