import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      };
  }

  getAll(): Observable<Cart[]> {
      return this.httpClient
          .get<Cart[]>(this.apiURL + '/api/cart/get-all', this.httpOptions)
          .pipe();
  }

  addItemToCart(courseId: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/cart/add-to-cart/' + courseId, this.httpOptions)
        .pipe();
  }

  deleteItemFromCart(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/cart/delete-item/' + id, this.httpOptions)
  }

  deleteCart(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/cart/delete-cart/' + id, this.httpOptions)
  }


}
