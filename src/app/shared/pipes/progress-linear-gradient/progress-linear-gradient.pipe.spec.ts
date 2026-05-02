import { ProgressLinearGradientPipe } from "./progress-linear-gradient.pipe";

describe("ProgressLinearGradientPipe", () => {
	const pipe = new ProgressLinearGradientPipe();
	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it("should return a 50% linear gradient string", () => {
		const result = pipe.transform(50, 100);
		expect(result).toBe(
			"linear-gradient(to right, #29ABE2 0%, #29ABE2 50%, #F4F4F4 50%, #F4F4F4 100%)",
		);
	});

	it("should return a 75% linear gradient string with maxValue", () => {
		const result = pipe.transform(75, 100);
		expect(result).toBe(
			"linear-gradient(to right, #29ABE2 0%, #29ABE2 75%, #F4F4F4 75%, #F4F4F4 100%)",
		);
	});

	it("should return a 0% linear gradient string", () => {
		const result = pipe.transform(0, 100);
		expect(result).toBe(
			"linear-gradient(to right, #29ABE2 0%, #29ABE2 0%, #F4F4F4 0%, #F4F4F4 100%)",
		);
	});

	it("should return a 100% linear gradient string", () => {
		const result = pipe.transform(100, 100);
		expect(result).toBe(
			"linear-gradient(to right, #29ABE2 0%, #29ABE2 100%, #F4F4F4 100%, #F4F4F4 100%)",
		);
	});
});
