import { render } from "@testing-library/angular";
import { FormFieldComponent } from "./form-field.component";

describe("FormFieldComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(FormFieldComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
