import { render } from "@testing-library/angular";
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(LogInComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
