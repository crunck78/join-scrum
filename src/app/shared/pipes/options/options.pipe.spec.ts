import { OptionsPipe } from "./options.pipe";

interface TestItem {
	id: number;
	name: string;
	label: string;
}

describe("OptionsPipe", () => {
	let pipe: OptionsPipe;

	beforeEach(() => {
		pipe = new OptionsPipe();
	});

	it("should map items to Option structure correctly", () => {
		const input: TestItem[] = [
			{ id: 1, name: "A", label: "Label A" },
			{ id: 2, name: "B", label: "Label B" },
		];

		const result = pipe.transform(input, "name", "id");

		expect(result.length).toBe(2);

		expect(result[0].displayValue).toBe("A");
		expect(result[0].valueOnSelect).toBe(1);
		expect(result[0].value).toEqual(input[0]);

		expect(result[1].displayValue).toBe("B");
		expect(result[1].valueOnSelect).toBe(2);
		expect(result[1].value).toEqual(input[1]);
	});

	it("should return empty array when input is empty", () => {
		const result = pipe.transform([], "name", "id");
		expect(result).toEqual([]);
	});

	it("should correctly use dynamic keys", () => {
		const input: TestItem[] = [{ id: 10, name: "X", label: "LX" }];

		const result = pipe.transform(input, "label", "id");

		expect(result[0].displayValue).toBe("LX");
		expect(result[0].valueOnSelect).toBe(10);
	});
});
