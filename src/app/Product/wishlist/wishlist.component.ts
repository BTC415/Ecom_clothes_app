import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  related_images:any[] = [
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LAVA220512_3_360x.jpg?v=1652430392",content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_106683_360x.jpg?v=1653067583" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_112642_360x.jpg?v=1655711101" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_109349_360x.jpg?v=1652870853" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_108080_360x.jpg?v=1647259059" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_107519_360x.jpg?v=1647267635" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_107365_360x.jpg?v=1648735575" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LAVA220512_3_360x.jpg?v=1652430392" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_106683_360x.jpg?v=1653067583" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_112642_360x.jpg?v=1655711101" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_109349_360x.jpg?v=1652870853" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
    {path:"https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_108080_360x.jpg?v=1647259059" ,content : "High Waist Tapered Trouser In Spring Green",price:"Rs. 10,100.00"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
