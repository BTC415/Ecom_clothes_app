import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  closeResult = '';
  products: any;
  env = environment

  @ViewChild('myCarousel')
  myCarousel!: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
    slide: 1,
    speed: 2000,
    interval: { timing: 3000, initialDelay: 1000 },
    load: 1,
    loop: true,
    touch: true,
    velocity: 0.2,
    vertical: {
      enabled: true,
      height: 600,
    },
  };
  constructor(
    private _cdr: ChangeDetectorRef,
    config: NgbCarouselConfig,
    private modalService: NgbModal,
    private router: Router,
    private api: ApiService
  ) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  trending_images: any[] = [
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LAVA220512_3_360x.jpg?v=1652430392',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_106683_360x.jpg?v=1653067583',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_112642_360x.jpg?v=1655711101',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_109349_360x.jpg?v=1652870853',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_108080_360x.jpg?v=1647259059',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_107519_360x.jpg?v=1647267635',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_107365_360x.jpg?v=1648735575',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LAVA220512_3_360x.jpg?v=1652430392',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_106683_360x.jpg?v=1653067583',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_112642_360x.jpg?v=1655711101',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_109349_360x.jpg?v=1652870853',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
    {
      path: 'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_108080_360x.jpg?v=1647259059',
      content: 'High Waist Tapered Trouser In Spring Green',
      price: 'Rs. 10,100.00',
    },
  ];

  ngOnInit(): void {
    this.getAllProducts();
  }
  ngAfterViewInit() {
    this._cdr.detectChanges();
  }
  carouselItems: any[any] = [
    'assets/images/home-1.webp',
    'assets/images/home-2.webp',
  ];
  mainItems: any[] = [...this.carouselItems];

  carouselTileLoad(data: any) {
    let arr = this.carouselItems;
    this.carouselItems = [...this.carouselItems, ...this.mainItems];
  }

  //get all product
  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        // console.log('res', res.data);
        this.products = res.data
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnHomepage(newin: any) {
    this.router.navigate(['clothing'], { queryParams: { newin: newin } });
  }
  btnweddingpage(category: any) {
    this.router.navigate(['clothing'], { queryParams: { category: category } });
  }

  btnOneProduct(_id:any){
    this.router.navigate(['product/',_id])
  }
  //open support dialog
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
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
}
