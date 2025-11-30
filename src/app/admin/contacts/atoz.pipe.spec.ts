import { describe, expect, it } from "vitest";
import { AtoZPipe } from "./atoz.pipe";

describe("AtozPipe", () => {
	const pipe = new AtoZPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
