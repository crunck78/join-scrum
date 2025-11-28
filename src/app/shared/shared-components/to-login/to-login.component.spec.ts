import { render } from "@testing-library/angular";
import { ToLoginComponent } from "./to-login.component";

describe("ToLoginComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ToLoginComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
