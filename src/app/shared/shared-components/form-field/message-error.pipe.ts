import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'messageError',
  standalone: true,
  pure: false
})
export class MessageErrorPipe implements PipeTransform {

  transform(control: FormControl, errors: ValidationErrors[]): string {
    const foundErrors = errors?.filter(err => control.hasError(err['name']));
    return foundErrors.map(fe => fe['htmlMessage']).join('<br>');
    //return foundError ? foundError['htmlMessage'] : "No defined Error Message";
  }

}
