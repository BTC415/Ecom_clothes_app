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
