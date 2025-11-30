import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { SubtaskComponent } from "./subtask.component";

describe("SubtaskComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(SubtaskComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
