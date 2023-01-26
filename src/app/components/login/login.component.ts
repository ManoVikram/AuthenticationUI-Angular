import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;

    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";

    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      // TODO: Send to DB
    } else {
      // TODO: Display a toast message with the error
      // this._validateAllFormFields(this.loginForm);
      ValidateForm.validateAllFormFields(this.loginForm);

      alert("The form is invalid!");
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
