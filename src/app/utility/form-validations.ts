import { ElementRef, Injectable } from '@angular/core';
import { HelperFunctionService } from '../services/helper-function.service';
import { FormGroup, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root',
})

export class FormValidationsService {

  constructor(
    public helperFn: HelperFunctionService
   ) {

  }
    clearFormValues(form, clearFields) {
      for (let i = 0; i < clearFields.length; i++) {
        form.get(clearFields[i]).setValue('');
        form.get(clearFields[i]).updateValueAndValidity();
        if (i == clearFields.length - 1) {
          return form;
        }
      }
    }

    getKycValidators(type: string): any[] | undefined {
      try {
        const kycIdNames = this.helperFn.getKycIdNames();
        switch (type) {
          case kycIdNames.Pan:
            return [
              Validators.maxLength(10),
              Validators.minLength(10),
              Validators.pattern(
                /^[a-zA-Z]{3}[pPhH]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/,
              ),
              Validators.required,
            ];
          case kycIdNames.NonPan:
            return [
              Validators.maxLength(10),
              Validators.minLength(10),
              Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/),
              Validators.required,
            ];
          case kycIdNames.Aadhar:
            return [
              Validators.maxLength(12),
              Validators.minLength(12),
              Validators.pattern('[2-9]{1}[0-9]{11}'),
              Validators.required,
            ];
          case kycIdNames.VoterId:
            return [
              Validators.maxLength(16),
              Validators.minLength(10),
              Validators.pattern('[a-zA-Z0-9]*'),
              Validators.required,
            ];
          case kycIdNames.DrivingLicense:
            return [
              Validators.maxLength(20),
              Validators.minLength(1),
              Validators.pattern('[a-zA-Z0-9]*'),
              Validators.required,
            ];
          case kycIdNames.Passport:
            return [
              Validators.pattern(/^[A-Za-z]{1}[0-9]{7}$/),
              Validators.maxLength(8),
              Validators.minLength(8),
              Validators.required,
            ];
        }
      } catch (error) {
        console.error(`Error in getKycValidators: ${error.message}`);
        return [];
      }
    }

    setFormValues(form: FormGroup, values: { [key: string]: any }) {
      try {
        for (const key in values) {
          if (values.hasOwnProperty(key) && form.controls.hasOwnProperty(key)) {
            form.get(key)?.setValue(values[key]);
            form.get(key)?.updateValueAndValidity();
          }
        }
      } catch (error) {
        console.log(
          error,
          'FormValidationsService-setFormValues',
        );
      }
    }

    clearAllValidations(form, clearFields) {
      for (let i = 0; i < clearFields.length; i++) {
        form.get(clearFields[i]).clearValidators();
        form.get(clearFields[i]).setValue('');
        form.get(clearFields[i]).updateValueAndValidity();
        if (i == clearFields.length - 1) {
          return form;
        }
      }
    }

    disableFormControls(form: FormGroup) {
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].disable();
      });
    }
    enableFormControls(form: FormGroup) {
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].enable();
      });
    }
  
    disableSelectedFormControls(form, clearFields) {
      clearFields.forEach((controlName) => {
        form.get(controlName).disable();
      });
    }
  
    markFormAsTouched(form: FormGroup) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        control?.markAsTouched();
      });
    }

    setSingleFormValues(form: FormGroup, controlName: string, value: any) {
      try {
        form.controls[controlName].setValue(value);
        form.controls[controlName].updateValueAndValidity();
      } catch (error) {
        console.log(
          error,
          'FormValidationsService-setSingleFormValues',
        );
      }
    }
}


