import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { AddTaskComponent } from "./add-task.component";

describe("AddTaskComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddTaskComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
