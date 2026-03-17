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

	it("should return false when a child with the given letter id exists", () => {
		const child = document.createElement("div");
		child.id = "contact-a";
		container.appendChild(child);

		expect(pipe.transform(container, "a")).toBe(false);
	});

	it("should return true for a different letter when only one letter is present", () => {
		const child = document.createElement("div");
		child.id = "contact-a";
		container.appendChild(child);

		expect(pipe.transform(container, "b")).toBe(true);
	});

	it("should be case-sensitive — uppercase letter does not match lowercase id", () => {
		const child = document.createElement("div");
		child.id = "contact-a";
		container.appendChild(child);

		expect(pipe.transform(container, "A")).toBe(true);
	});
});
