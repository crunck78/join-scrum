import { Pipe, type PipeTransform } from "@angular/core";
import type { FormControl } from "@angular/forms";
import type { ValidatorError } from "./form-field.component";

@Pipe({
	name: "hasError",
	standalone: true,
	pure: false,
})
export class HasErrorPipe implements PipeTransform {
	transform(control: FormControl, errors: ValidatorError[]): boolean {
		const foundErrors = errors?.some((err) => control.hasError(err.name));
		return foundErrors;
	}
}
