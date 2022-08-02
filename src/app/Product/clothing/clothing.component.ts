import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  formSupport!: FormGroup;
  submitted = false;
  file!: File;
  profile_preview: any;
  selectedTeam = '';
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private acRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
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
