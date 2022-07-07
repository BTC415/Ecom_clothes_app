import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hideInput = true;
  constructor() {}

  ngOnInit(): void {}
  forgotpwd() {
    this.hideInput = false;
  }
  btncancel(){
    this.hideInput = true
  }
}
