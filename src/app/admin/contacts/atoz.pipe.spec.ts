import { AtoZPipe } from "./atoz.pipe";

describe("AtozPipe", () => {
	let pipe: AtoZPipe;
	let container: HTMLElement;

	beforeEach(() => {
		pipe = new AtoZPipe();
		container = document.createElement("div");
	});

	it("should create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it("should return true when no child with the given letter id exists", () => {
		expect(pipe.transform(container, "a")).toBe(true);
	});

	const scenarios = [
		{
			description:
				"should return false when a child with the given letter id exists",
			value: "a",
			expected: false,
		},
		{
			description:
				"should return true for a different letter when only one letter is present",
			value: "b",
			expected: true,
		},
		{
			description:
				"should be case-sensitive — uppercase letter does not match lowercase id",
			value: "A",
			expected: true,
		},
	];

	it.each(scenarios)("$description", ({ value, expected }) => {
		const child = document.createElement("div");
		child.id = "contact-a";
		container.appendChild(child);

		expect(pipe.transform(container, value)).toBe(expected);
	});
});
