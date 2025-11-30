import { describe, expect, it } from "vitest";
import { MessageErrorPipe } from "./message-error.pipe";

describe("MessageErrorPipe", () => {
	const pipe = new MessageErrorPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
