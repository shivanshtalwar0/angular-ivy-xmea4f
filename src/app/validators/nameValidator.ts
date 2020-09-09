import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, ValidationErrors, Validator, FormControl} from '@angular/forms';

@Directive({
  selector: '[nameValidator]',
  // We add our directive to the list of existing validators
  providers: [
    {provide: NG_VALIDATORS, useExisting: CustomValidators, multi: true}
  ]
})
export class CustomValidators implements Validator {

  static nameValidator(control: FormControl): ValidationErrors {
      const nameRegex: RegExp = /^.*[0-9]|[~!@#$%^&*()_+\-={}'":;\\|><.,/?`].*$/;
      const forbidden = nameRegex.test(control.value);
      return forbidden ? {invalidName: true} : null;
  }

// This method is the one required by the Validator interface
  validate(c: FormControl): ValidationErrors | null {
    // Here we call our static validator function
    return CustomValidators.nameValidator(c);
  }
}


