import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Custom validator to require at least one of the specified fields to be non-empty */
export function requireAtLeastOne(fieldList: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isAtLeastOneFilled = fieldList.some(fieldName => {
            const field = control.get(fieldName);
            const value = field?.value;
            return value !== null && value !== undefined && value !== '';
        });

        return isAtLeastOneFilled ? null : { requireAtLeastOne: true };
    };
}
