import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorError } from './form-field.component';

@Pipe({
  name: 'hasError',
  standalone: true,
  pure: false,
})
export class HasErrorPipe implements PipeTransform {

  transform(control: FormControl, errors: ValidatorError[]): boolean {
    const foundErrors = errors?.some(err => control.hasError(err.name));
    return foundErrors;
  }

}
