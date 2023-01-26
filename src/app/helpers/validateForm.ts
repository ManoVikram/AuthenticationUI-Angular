import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm {
    // Helps in validating the form and displaying the errors onto the screen
    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}