import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  FormSignUp!: FormGroup;
  submitted = false;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.FormSignUp = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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
    return this.FormSignUp.controls;
  }
  btnSignUp() {
    this.submitted = true;
    if (!this.FormSignUp.valid) {
      return;
    } else {
      this.api.SignUp(this.FormSignUp.value).subscribe({
        next: (res) => {
          this.toastr.success('Your Registration Successfully.', '', {
            timeOut: 2000,
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error('Email address is Already exists', '', {
            timeOut: 2000,
          });
          console.log('error', error);
        },
      });
    }
  }
}
