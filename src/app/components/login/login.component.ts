import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) { }

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

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // alert(res.message);

          this.loginForm.reset();

          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });

          this.router.navigate(["dashboard"]);
        },
        error: (err) => {
          // alert(err?.error.message);

          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 5000 });
        }
      });
    } else {
      // Display a toast message with the error
      // this._validateAllFormFields(this.loginForm);
      ValidateForm.validateAllFormFields(this.loginForm);

      // alert("The form is invalid!");
      this.toast.error({ detail: "ERROR", summary: "The form is invalid!", duration: 5000 });
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
