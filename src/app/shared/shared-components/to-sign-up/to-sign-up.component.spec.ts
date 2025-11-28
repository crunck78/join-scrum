import { render } from "@testing-library/angular";
import { ToSignUpComponent } from "./to-sign-up.component";

describe("ToSignUpComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ToSignUpComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
