import { render } from "@testing-library/angular";
import { DialogComponent } from "./dialog.component";

describe("DialogComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(DialogComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
