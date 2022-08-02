import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  env = environment;
  formSupport!: FormGroup;
  submitted = false;
  file!: File;
  profile_preview: any;

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
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
    this.formSupport = this.fb.group({
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
      file: [''],
    });
    this.getAllProducts();
  }

  get f() {
    return this.formSupport.controls;
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
        this.products = res.data;
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

  btnOneProduct(_id: any) {
    this.router.navigate(['product/', _id]);
  }
  //open support dialog
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log('result', result);
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            if (this.formSupport.valid) {
              this.btnSend();
            }
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

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log('file', this.file);
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event) => {
        this.profile_preview = reader.result;
      };
      this.formSupport.get('file')!.patchValue(this.file);
      this.formSupport.patchValue({ file: this.file });
    }
  }

  btnSend() {
    this.submitted = true;
    if (this.formSupport.valid) {
      console.log('value', this.formSupport.value);
      const formData = new FormData();
      formData.append('name', this.formSupport.get('name')!.value);
      formData.append('email', this.formSupport.get('email')!.value);
      formData.append('message', this.formSupport.get('message')!.value);
      formData.append('file', this.formSupport.get('file')!.value);
      console.log('formData', formData);
      this.api.supportData(formData).subscribe({
        next: (res) => {
          this.toastr.success('Support data sent successfully.', '', {
            timeOut: 2000,
          });
          this.submitted = false;
          this.formSupport.reset();
          this.modalService.dismissAll();
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    } else {
    }
  }
}
