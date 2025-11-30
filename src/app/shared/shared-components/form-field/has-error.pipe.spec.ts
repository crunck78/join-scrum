import { describe, expect, it } from "vitest";
import { HasErrorPipe } from "./has-error.pipe";

describe("HasErrorPipe", () => {
	const pipe = new HasErrorPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
