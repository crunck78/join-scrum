import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ResetPasswordComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
