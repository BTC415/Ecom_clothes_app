import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formContact!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formContact = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
      phone_number: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }

  get f() {
    return this.formContact.controls;
  }

  btnSend() {
    this.submitted = true;
    if (this.formContact.valid) {
      this.api.contactData(this.formContact.value).subscribe({
        next: (res) => {
          console.log('res', res);
          this.toastr.success('Contact data sent successfully.', '', {
            timeOut: 2000,
          });
          this.formContact.reset();
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }
}
