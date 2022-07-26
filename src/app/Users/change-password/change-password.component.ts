import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  formChangPwd!: FormGroup;
  submitted = false;
  _id: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    private acroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formChangPwd = this.fb.group({
      password: ['', [Validators.required]],
      newpassword: [
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
    return this.formChangPwd.controls;
  }

  btnsubmit() {
    this.submitted = true;
    if (!this.formChangPwd.valid) {
    } else if (
      this.formChangPwd.value.newpassword !== this.formChangPwd.value.confirmpwd
    ) {
      this.toastr.error(
        'New password and comfirm password does not match.',
        '',
        {
          timeOut: 2000,
        }
      );
    } else {
      const Obj = {
        _id: this._id,
        oldpassword: this.formChangPwd.value.password,
        newpassword: this.formChangPwd.value.newpassword,
      };
      this.api.ChagePassword(Obj).subscribe({
        next: (res) => {
          console.log('res', res);
          this.toastr.success('Password Change Successfully , Login Now.', '', {
            timeOut: 2000,
          });
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.log('error', error);
          this.toastr.error(
            'Please Enter the valid Old password.',
            '',
            {
              timeOut: 2000,
            }
          );
        },
      });
    }
  }
}
