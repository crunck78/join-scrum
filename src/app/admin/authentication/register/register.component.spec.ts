import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(RegisterComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
