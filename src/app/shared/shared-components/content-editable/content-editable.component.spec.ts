import { render } from "@testing-library/angular";
import { ContentEditableComponent } from "./content-editable.component";

describe("ContentEditableComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContentEditableComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
