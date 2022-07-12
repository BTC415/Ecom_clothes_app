import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss'],
})
export class ForgotpwdComponent implements OnInit {
  formforgotpwd!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    private acroute: ActivatedRoute,
    private router : Router
  ) {}
  submitted = false;
  _id: any;
  ngOnInit(): void {
    this.formforgotpwd = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
          ),
        ],
      ],
      confirmpwd: ['', Validators.required],
    });

    this._id = this.acroute.snapshot.queryParams['id'];
    console.log('id', this._id);
  }
  get f() {
    return this.formforgotpwd.controls;
  }
  btnsubmit() {
    this.submitted = true;
    if (
      this.formforgotpwd.value.password !== this.formforgotpwd.value.confirmpwd
    ) {
      this.toastr.error('Password & Confirm Password does not match', '', {
        timeOut: 2000,
      });
    } else if (!this.formforgotpwd.valid) {
    } else {
      const pwdObj = {
        password: this.formforgotpwd.value.password,
        _id: this._id,
      };
      console.log('pwdobj', pwdObj);
      this.api.ForgotPassword(pwdObj).subscribe({
        next: (res) => {
          this.toastr.success('Password change successfully.', '', {
            timeOut: 2000,
          });
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }
}
