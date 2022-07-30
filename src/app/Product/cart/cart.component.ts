import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: any;
  env = environment;
  math = Math;
  sum: any;
  product_length: any;
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
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    // this.calTotal();
    this.getCartData();
  }

  getCartData() {
    this.api.getCartData().subscribe({
      next: (res) => {
        this.products = res.data;
        this.product_length = this.products.length;
        let price: any[] = [];

        this.products.map((i: any) => {
          let product_price =
            (i.price - (i.price * i.discount) / 100) * i.cart_quantity;
          console.log('product_price', product_price);
          price.push(product_price);
        });
        console.log('price', price);
        this.sum = 0;
        for (let i = 0; i < price.length; i++) {
          console.log('price[i]', price[i]);
          this.sum += price[i];
          console.log('sum', this.sum);
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnProduct(_id: any) {
    this.router.navigate(['product/', _id]);
  }

  btnRemove(_id: any) {
    console.log('id', _id);
    this.api.deleteCartData({ product_id: _id }).subscribe({
      next: (res) => {
        console.log('res', res);
        this.getCartData();

        // this.calTotal();
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  calTotal() {
    // let price: any[] = [];
    // this.products.map((i: any) => {
    //   price.push((i.price - (i.price * i.discount / 100)) * (i.cart_quantity));
    // });
    // console.log("price",price)
    // for (let i = 0; i < price.length; i++) {
    //   console.log("price[i]",price[i])
    //   this.sum += price[i];
    //   console.log("sum",this.sum)
    // }
  }
}
