import { AtoZPipe } from "./atoz.pipe";

describe("AtozPipe", () => {
	const pipe = new AtoZPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
