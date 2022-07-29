import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  user_id: any;
  products: any;
  env = environment;
  sum: any;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
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
  related_images: any[] = [
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

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWishlist();
    this.api.Userloggedin().subscribe({
      next: (res) => {
        this.user_id = res.data._id;
        console.log('this.user_id', this.user_id);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  getWishlist() {
    this.api.getWishlistData().subscribe({
      next: (res) => {
        this.products = res.data;
        let price_arr: any[] = [];
        this.products.map((i: any) => {
          price_arr.push(i.price);
        });
        this.sum = 0;

        for (let i = 0; i < price_arr.length; i++) {
          this.sum += price_arr[i];
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnProductName(_id: any) {
    this.router.navigate(['product/', _id]);
  }
  btnDelete(product_id: any) {
    console.log('id', product_id);
    let Obj = { product_id: product_id };
    this.api.deleteWishList(Obj).subscribe({
      next: (res) => {
        console.log('res', res);
        this.toastr.info('Delete the item from your wishlist.', '', {
          timeOut: 2000,
        });
        this.getWishlist();
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  btnCart(_id: any) {
    console.log('_id', _id);
    let obj = {
      user_id: this.user_id,
      product_id: _id,
    };
    console.log('obj', obj);
    this.api.addCart(obj).subscribe({
      next: (res) => {
        console.log('res', res);
        this.toastr.success('Successfully Add this Product to your Cart.', '', {
          timeOut: 2000,
        });
        this.router.navigate(['cart']);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
