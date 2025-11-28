import { render } from "@testing-library/angular";
import { BoardComponent } from "./board.component";

describe("BoardComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(BoardComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
