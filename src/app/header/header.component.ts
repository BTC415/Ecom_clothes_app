import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  countCart: any;
  searchValue: string = '';
  closeResult = '';
  constructor(
    private router: Router,
    private api: ApiService,
    private modalService: NgbModal
  ) {
    this.changeText = false;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll); //third parameter
    this.HeaderName();
    this.countCartData();
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

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.btnlogout();
            // this.deleteMultiple_products();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  btnlogout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
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

  btnSearch() {
    console.log('searchValue ==> ', this.searchValue);
    this.router.navigate(['search'], {
      queryParams: { q: this.searchValue },
    });
  }

  countCartData() {
    this.api.getCartData().subscribe({
      next: (res) => {
        this.countCart = res.data.length;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
