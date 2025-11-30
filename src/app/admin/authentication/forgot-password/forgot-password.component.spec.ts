import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ForgotPasswordComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
