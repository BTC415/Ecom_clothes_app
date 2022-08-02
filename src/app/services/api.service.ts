import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  env: any = environment;
  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'singup', data);
  }
  UserLogin(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'login', data);
  }
  //send email
  SendEmail(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'sendmail', { email: data });
  }

  //forgot password
  ForgotPassword(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'forgotpwd', data);
  }

  //edit profile
  EditProfile(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'editprofile', data);
  }

  //get all products
  getProducts(category?: any): Observable<any> {
    if (category == undefined) {
      return this.http.get(this.env.apiUrl + 'products');
    } else {
      return this.http.get(this.env.apiUrl + 'products', {
        params: { category: category },
      });
    }
  }
  getCollectionProducts(collection?: any): Observable<any> {
    return this.http.get(this.env.apiUrl + 'products', {
      params: { collection: collection },
    });
  }
  getNewInProducts(newin?: any): Observable<any> {
    return this.http.get(this.env.apiUrl + 'products', {
      params: { newin: newin },
    });
  }

  //get one product
  GetOneProduct(_id: any): Observable<any> {
    return this.http.get(this.env.apiUrl + 'product/' + _id);
  }

  //change password
  ChagePassword(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'changepassword', data);
  }

  //add wishlist
  addWishList(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'addwishlist', data);
  }

  //display wishlist
  getWishlistData(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'wishlistdata', {
      headers: this.getHeaders(),
    });
  }

  //delete wishlist
  deleteWishList(data: any): Observable<any> {
    return this.http.delete(this.env.apiUrl + 'deletewishlist', {
      headers: this.getHeaders(),
      body: data,
    });
  }

  //add cart
  addCart(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'addcart', data);
  }

  //display cart data
  getCartData(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'getcart', {
      headers: this.getHeaders(),
    });
  }

  //delete cart product
  deleteCartData(data: any): Observable<any> {
    return this.http.delete(this.env.apiUrl + 'deletecart', {
      headers: this.getHeaders(),
      body: data,
    });
  }

  //add support data
  supportData (data:any):Observable<any>{
    return this.http.post("http://localhost:3000/postsupportdata",data)
  }

  // add contact data
  contactData(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/contactdata",data)
  }


  Userloggedin(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'userloggedin', {
      headers: this.getHeaders(),
    });
  }
  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return headers;
  }
}
