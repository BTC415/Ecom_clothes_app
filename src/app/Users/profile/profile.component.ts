import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = true;
  profileform: any = false;
  order: any = false;
  submitted = false;
  _id: any;
  firstname: any;
  lastname: any;
  email: any;
  city: any;
  image: any;
  phonenumber: any;
  address: any;
  file!: File;
  ProfileForm!: FormGroup;
  profile_preview: any;
  constructor(
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ProfileForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        city: ['', Validators.required],
        address: ['', Validators.required],
        phonenumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        image: [''],
        _id: [''],
      },
      { updateOn: 'change' }
    );
    this.getProfileData();
  }
  get f() {
    return this.ProfileForm.controls;
  }
  btnEditProfile() {
    this.profile = false;
    this.profileform = true;
    this.order = false;
  }
  personal_detail() {
    this.profile = true;
    this.order = false;
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log('file', this.file);
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event) => {
        this.profile_preview = reader.result;
      };
      this.ProfileForm.get('image')!.patchValue(this.file);
      this.ProfileForm.patchValue({ image: this.file });
    }
  }

  btnSubmit() {
    this.order = false;
    // this.profileform = false;
    this.submitted = true
    if (!this.ProfileForm.valid) {
      this.profile = false;
      this.profileform = true;
    } else {
      this.profile = true;
      this.profileform = false;
      console.log('file===>', this.file);

      const formData = new FormData();
      formData.append('_id', this.ProfileForm.get('_id')!.value);
      formData.append('firstname', this.ProfileForm.get('firstname')!.value);
      formData.append('lastname', this.ProfileForm.get('lastname')!.value);
      formData.append('email', this.ProfileForm.get('email')!.value);
      formData.append('address', this.ProfileForm.get('address')!.value);
      formData.append('city', this.ProfileForm.get('city')!.value);
      formData.append(
        'phonenumber',
        this.ProfileForm.get('phonenumber')!.value
      );
      formData.append('image', this.ProfileForm.get('image')!.value);

      this.api.EditProfile(formData).subscribe({
        next: (res) => {
          console.log('res', res);
          this.toastr.success('Profile updated successfully.', '', {
            timeOut: 2000,
          });
          this.getProfileData();
        },
        error: (error) => {
          this.toastr.success('error.', '', {
            timeOut: 2000,
          });
        },
      });
    }
  }
  orders() {
    this.order = true;
    this.profile = false;
    this.profileform = false;
  }

  btnChangePwd() {
    this.api.Userloggedin().subscribe({
      next: (res) => {
        this._id = res.data._id;
        this.router.navigate(['/changepassword'], {
          queryParams: { id: this._id },
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  getProfileData() {
    this.api.Userloggedin().subscribe({
      next: (res) => {
        this.firstname = res.data.firstname;
        this.lastname = res.data.lastname;
        this.email = res.data.email;
        this.city = res.data.city;
        this.address = res.data.address;
        this.phonenumber = res.data.phonenumber;
        this.image = res.data.image;
        this._id = res.data._id;
        this.ProfileForm.patchValue(res.data);

        // console.log("city",res.data.city);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
