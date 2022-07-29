import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss'],
})
export class ClothingComponent implements OnInit {
  closeResult = '';
  products: any;
  env = environment;
  math = Math;
  selectedTeam = '';
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private acRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acRoute.queryParams.subscribe((params: any) => {
      if (params['category']) {
        let header_cat = params['category'];
        this.getHeaderProducts(header_cat);
      } else if (params['collection']) {
        let header_collection = params['collection'];
        this.getCollection_Products(header_collection);
      } else if (params['newin']) {
        let newin_product = params['newin'];
        this.NewIn_Products(newin_product);
      } else {
        this.getAllProducts();
      }
    });
  }

  //get all products
  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  // get header wise products
  getHeaderProducts(header_cat: any) {
    this.api.getProducts(header_cat).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  //collection wise products
  getCollection_Products(header_collection: any) {
    this.api.getCollectionProducts(header_collection).subscribe({
      next: (res) => {
        this.products = res.data;
        console.log('res.data', res.data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  //new in products
  NewIn_Products(newin_product: any) {
    this.api.getNewInProducts(newin_product).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnCategory(cat_product: any) {
    this.api.getProducts(cat_product).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnOneProduct(_id: any) {
    console.log('id', _id);
    this.router.navigate(['product/', _id]);
  }

  compare(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    if (this.selectedTeam === 'a-z') {
      this.products.sort(this.compare);
    }else if(this.selectedTeam ==='manual'){
      this.getAllProducts();
    }
    else if(this.selectedTeam ==='lowToHigh'){
      this.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
    }
    else if(this.selectedTeam ==='highToLow'){
      this.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
    }
    else if(this.selectedTeam ==='newToOld'){
      this.products.sort(function compare(a:any, b:any) {
        var dateA:any = new Date(a.date);
        var dateB:any = new Date(b.date);
        return dateB - dateA;
      });
    }
    else if(this.selectedTeam ==='oldToNew'){
      this.products.sort(function compare(a:any, b:any) {
        var dateA:any = new Date(a.date);
        var dateB:any = new Date(b.date);
        return dateA - dateB;
      });
    }else{
      this.getAllProducts();
    }
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
