import { OptionsPipe } from "./options.pipe";

describe("OptionsPipe", () => {
	const pipe = new OptionsPipe();
	it("create an instance", () => {

		expect(pipe).toBeTruthy();
	});
});
