import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { DialogComponent } from "./dialog.component";

describe("DialogComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(DialogComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
