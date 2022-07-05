import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

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
  constructor(private _cdr: ChangeDetectorRef,config: NgbCarouselConfig) {
    config.interval = 2000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
  }

  ngOnInit(): void {}
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
}
