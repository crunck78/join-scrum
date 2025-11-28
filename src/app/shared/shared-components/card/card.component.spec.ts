import { render } from "@testing-library/angular";
import { CardComponent } from "./card.component";

describe("CardComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(CardComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
