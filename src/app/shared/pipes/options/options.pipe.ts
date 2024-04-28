import { Pipe, PipeTransform } from '@angular/core';
import { Option, OptionType } from './../../shared-components/form-field/form-field.component';

type HtmlFunction = (item: OptionType) => string;

@Pipe({
  name: 'options',
  standalone: true,
})
export class OptionsPipe implements PipeTransform {

  transform(optionValues: OptionType[] | null, displayValue: keyof OptionType, valueOnSelect: keyof OptionType, htmlFn?: HtmlFunction): Option<OptionType>[] | null | undefined {
    return optionValues?.map((o) => {
      return {
        value: o,
        displayValue: o[displayValue],
        valueOnSelect: o[valueOnSelect],
        html: htmlFn ? htmlFn(o) : ''
      } as Option<OptionType>
    });
  }

}
