import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hideInput = true;
  submitted = false;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
          ),
        ],
      ],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  btnlogin() {
    this.submitted = true;
    this.api.UserLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Login Successfully.', '', {
          timeOut: 2000,
        });
        localStorage.setItem('token', res.token);
        this.router.navigate(['home'])
      },
      error: (error) => {
        console.log('error.error.msg', error.error.msg);
        console.log('error', error);

        this.toastr.success(error.error.msg, '', {
          timeOut: 2000,
        });
      },
    });
  }
  forgotpwd() {
    this.hideInput = false;
  }
  btncancel() {
    this.hideInput = true;
  }
}
