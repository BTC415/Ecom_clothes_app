import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent implements OnInit {
  galleryOptions!: NgxGalleryOptions[];
  galleryImages:any[] = [];
  responseImages = [
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105068_1500x.progressive.jpg?v=1653067612',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105105_1500x.progressive.jpg?v=1653067612',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105073_1500x.progressive.jpg?v=1653067612',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105027_170x.progressive.jpg?v=1653067612',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105131_170x.progressive.jpg?v=1652868996',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105094_170x.progressive.jpg?v=1653067608',
    'https://cdn.shopify.com/s/files/1/2722/8634/products/LA_SPRING22_ECOM_105141_170x.progressive.jpg?v=1652868997',
    'assets/videos/video-1.mp4'
  ]
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
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
    this.galleryOptions = [
      {
        width: '600px',
        height: '1200px',
        // width: '600px',
        // height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.responseImages.forEach((e, i) => {
      this.galleryImages.push({
        small: e,
        medium: e,
        big: e,
      })
    });
  }

}
