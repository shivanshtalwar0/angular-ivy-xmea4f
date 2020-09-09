import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, ValidationErrors, Validator, FormControl} from '@angular/forms';

@Directive({
  selector: '[phoneValidator]',
  // We add our directive to the list of existing validators
  providers: [
    {provide: NG_VALIDATORS, useExisting: PhoneValidator, multi: true}
  ]
})
export class PhoneValidator implements Validator {


  static check(control: FormControl): ValidationErrors {
    const nameRegex: RegExp = /^[789]\d{9}$/;
    const forbidden = !nameRegex.test(control.value);
    return forbidden ? {invalidPhone: true} : null;
  }

// This method is the one required by the Validator interface
  validate(c: FormControl): ValidationErrors | null {
    // Here we call our static validator function
    return PhoneValidator.check(c);
  }
}


