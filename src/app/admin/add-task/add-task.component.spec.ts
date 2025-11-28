import { render } from "@testing-library/angular";
import { AddTaskComponent } from "./add-task.component";

describe("AddTaskComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddTaskComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
