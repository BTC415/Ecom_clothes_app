import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  paramsValue: any;
  products: any[] = [];
  env = environment;
  notMatch:any;

  constructor(
    private acRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.acRoute.queryParams.subscribe((params) => {
      this.paramsValue = params['q'];
    });
    this.getAllProduct();
  }

  btnSearch() {
    this.products = this.products.filter((obj: any) => {
      return obj.name === this.paramsValue;
    });
  }

  getAllProduct() {
    this.api.getProducts().subscribe({
      next: (res) => {
        console.log('res', res.data);
        res.data.map((i:any)=>{
          this.products.push({name : i.name , image : i.images[0].name})
        })
        
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
