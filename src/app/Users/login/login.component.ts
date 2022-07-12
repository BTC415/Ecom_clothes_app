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
    private router: Router
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
      role: ['user'],
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
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.toastr.error(error.error.msg, '', {
          timeOut: 2000,
        });
      },
    });
  }
  btnsendmail(){
    // this.submitted = true;
    console.log("this.loginForm.value.email====>",this.loginForm.value.email)
    this.api.SendEmail(this.loginForm.value.email).subscribe({
      next:(res)=>{
        console.log("res",res);
        this.toastr.success('Email send successfully , please check your Email', '', {
          timeOut: 2000,
        });
        this.loginForm.reset();
      },
      error:(error)=>{
        console.log("error",error)
        this.toastr.error(error.error.msg, '', {
          timeOut: 2000,
        });
      }
    })
  }
  forgotpwd() {
    this.hideInput = false;
  }
  btncancel() {
    this.hideInput = true;
  }
}
