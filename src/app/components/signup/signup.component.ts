import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  signUpForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;

    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";

    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignup() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      // TODO: Perform Signup logic
    } else {
      // TODO: Logic to throw errors
      // this._validateAllFormFields(this.signUpForm);
      ValidateForm.validateAllFormFields(this.signUpForm);
    }

  }

  // Helps in validating the form and displaying the errors onto the screen
  /* private _validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this._validateAllFormFields(control);
      }
    });
  } */
}
