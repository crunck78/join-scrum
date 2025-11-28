import { render } from "@testing-library/angular";
import { TaskComponent } from "./task.component";

describe("TaskComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(TaskComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
