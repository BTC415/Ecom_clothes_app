import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/signup', data);
  }
  UserLogin(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }
  //send email
  SendEmail(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/sendmail', { email: data });
  }

  //forgot password
  ForgotPassword(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/forgotpwd', data);
  }

  //edit profile
  EditProfile(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/editprofile', data);
  }

  //get all products
  getProducts(category?: any): Observable<any> {
    if (category == undefined) {
      return this.http.get('http://localhost:3000/products');
    } else {
      return this.http.get('http://localhost:3000/products', {
        params: { category: category },
      });
    }
  }
  getCollectionProducts(collection?: any): Observable<any> {
    return this.http.get('http://localhost:3000/products', {
      params: { collection: collection },
    });
  }
  getNewInProducts(newin?: any): Observable<any> {
    return this.http.get('http://localhost:3000/products', {
      params: { newin: newin },
    });
  }

  //get one product
  GetOneProduct(_id: any): Observable<any> {
    return this.http.get('http://localhost:3000/product/' + _id);
  }

  //change password
  ChagePassword(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/changepassword', data);
  }

  //add wishlist
  addWishList(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/addwishlist', data);
  }

  //display wishlist
  getWishlistData(): Observable<any> {
    return this.http.get('http://localhost:3000/wishlistdata', {
      headers: this.getHeaders(),
    });
  }

  //delete wishlist
  deleteWishList(data: any): Observable<any> {
    return this.http.delete('http://localhost:3000/deletewishlist', {
      headers: this.getHeaders(),
      body: data,
    });
  }

  //add cart
  addCart(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/addcart', data);
  }

  //display cart data
  getCartData(): Observable<any> {
    return this.http.get('http://localhost:3000/getcart', {
      headers: this.getHeaders(),
    });
  }

  //delete cart product
  deleteCartData(data: any): Observable<any> {
    return this.http.delete('http://localhost:3000/deletecart', {
      headers: this.getHeaders(),
      body: data,
    });
  }

  Userloggedin(): Observable<any> {
    return this.http.get('http://localhost:3000/userloggedin', {
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
