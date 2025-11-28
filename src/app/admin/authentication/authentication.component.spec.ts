import { render } from "@testing-library/angular";
import { AuthenticationComponent } from "./authentication.component";

describe("AuthenticationComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AuthenticationComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
