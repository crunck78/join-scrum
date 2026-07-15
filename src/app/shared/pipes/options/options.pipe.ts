import { Pipe, type PipeTransform } from "@angular/core";
export interface Option {
	valueOnSelect: unknown;
	displayValue: unknown;
	value: unknown;
}

@Pipe({
	name: "options",
	standalone: true,
})
export class OptionsPipe implements PipeTransform {
	transform<T>(
		optionValues: T[],
		displayValue: keyof T,
		valueOnSelect: keyof T,
	): Option[] {
		return optionValues.map((o) => ({
			value: o,
			displayValue: o[displayValue],
			valueOnSelect: o[valueOnSelect],
		}));
	}
}
