import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(LogInComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
