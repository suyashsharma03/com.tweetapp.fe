import { AbstractControl } from "@angular/forms";

export interface Required {
    valid: boolean;
}

export interface ValidationResult {
    required: Required;
}

export class ValidationService {
    public requiredField = (formControl: AbstractControl): ValidationResult => {
        if(!formControl.value && String(formControl.value).length < 1){
            return {
                required: {
                    valid: false,
                },
            };
        }
        else {
            return null;
        }
    };
}