import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSticky: Boolean = false;
  changeText: boolean;
 
  constructor() {  this.changeText = false; }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }

  scroll = (event: any): void => {
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    this.isSticky = top > 100 ? true : false
    // console.log('#######', top, this.isSticky)
  };

}
