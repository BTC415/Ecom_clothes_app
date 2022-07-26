import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSticky: Boolean = false;
  changeText: boolean;
  firstName: any;
  lastName: any;
  // clothing_item: any;
  constructor(private router: Router, private api: ApiService) {
    this.changeText = false;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll); //third parameter
    this.HeaderName();
    // this.getClothingItem();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }

  scroll = (event: any): void => {
    var top =
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0);
    this.isSticky = top > 100 ? true : false;
    // console.log('#######', top, this.isSticky)
  };
  btnlogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  HeaderName() {
    this.api.Userloggedin().subscribe({
      next: (res) => {
        this.firstName = res.data.firstname;
        this.lastName = res.data.lastname;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnCategory(cat_product: any) {
    this.router.navigate(['clothing'], {
      queryParams: { category: cat_product },
    });
  }

  btnCollection(collection: any) {
    this.router.navigate(['clothing'], {
      queryParams: { collection: collection },
    });
  }
  btnNewIn(newin: any) {
    this.router.navigate(['clothing'], {
      queryParams: { newin: newin },
    });
  }
}
