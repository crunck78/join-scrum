import { Pipe, type PipeTransform } from "@angular/core";
import type { Option } from "./../../shared-components/form-field/form-field.component";

type HtmlFunction<T> = (item: T) => string;

@Pipe({
	name: "options",
	standalone: true,
})
export class OptionsPipe implements PipeTransform {
	transform<T>(
		optionValues: T[],
		displayValue: keyof T,
		valueOnSelect: keyof T,
		htmlFn?: HtmlFunction<T>,
	): Option[] {
		return optionValues.map((o) => ({
			value: o,
			displayValue: o[displayValue],
			valueOnSelect: o[valueOnSelect],
			html: htmlFn ? htmlFn(o) : "",
		}));
	}
}
