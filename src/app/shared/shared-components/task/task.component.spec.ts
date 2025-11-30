import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { TaskComponent } from "./task.component";

describe("TaskComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(TaskComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
