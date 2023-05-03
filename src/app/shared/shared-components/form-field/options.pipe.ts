import { Pipe, PipeTransform } from '@angular/core';
import { Option } from './form-field.component';

@Pipe({
  name: 'options',
  standalone: true,
})
export class OptionsPipe implements PipeTransform {

  transform(optionValues: any[] | null, displayValue: any, valueOnSelect: any, htmlFn?: Function): Option[] | null | undefined {
    return optionValues?.map((o) => {
      return {
        value: o,
        displayValue: o[displayValue],
        valueOnSelect: o[valueOnSelect],
        html: htmlFn ? htmlFn(o) : ''
      } as Option
    });
  }

}
