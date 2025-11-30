import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { AuthenticationComponent } from "./authentication.component";

describe("AuthenticationComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AuthenticationComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
