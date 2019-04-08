import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Result } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this.registerForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl(null, [Validators.required])
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe((res: Result) => {
        if (res.success) {
          localStorage.setItem('currentUser', res.data.token);
          this.authService.currentUser = res.data.user;
          if (this.activatedRoute.snapshot.queryParams.returnURL) {
            this.router.navigate([this.activatedRoute.snapshot.queryParams.returnURL]);
          } else {
            this.router.navigate(['/']);
          }
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe((res: Result) => {
        if (res.success) {
          this.loginForm.patchValue({email: this.registerForm.getRawValue().email, password: this.registerForm.getRawValue().password});
          this.login();
        }
      })
    }
  }

}
