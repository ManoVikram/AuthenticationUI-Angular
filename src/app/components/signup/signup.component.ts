import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) { }

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
      // console.log(this.signUpForm.value);

      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          // alert(res.message);

          this.signUpForm.reset();

          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });

          this.router.navigate(["login"]);
        },
        error: (err) => {
          // alert(err?.error.message);

          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 5000 });
        }
      });
    } else {
      // Logic to throw errors
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
