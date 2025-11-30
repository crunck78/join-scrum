import { describe, expect, it } from "vitest";
import { ProgressLinearGradientPipe } from "./progress-linear-gradient.pipe";

describe("ProgressLinearGradientPipe", () => {
	const pipe = new ProgressLinearGradientPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
