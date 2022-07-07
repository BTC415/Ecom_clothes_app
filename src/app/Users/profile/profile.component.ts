import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = true;
  profileform: any = false;
  order: any = false;
  constructor() {}

  ngOnInit(): void {}
  btnEditProfile() {
    this.profile = false;
    this.profileform = true;
    this.order = false;
  }
  personal_detail() {
    this.profile = true;
    this.order = false;
  }
  btnSubmit() {
    this.profile = true;
    this.order = false;
    this.profileform = false;
  }
  orders() {
    this.order = true;
    this.profile = false
    this.profileform = false
  }
}
